from calendar import month
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from web3 import Web3
from solcx import compile_source

hostName = "167.172.38.37"
serverPort = 9000


def write_smart_contract(data):
    contract_dictonary = json.loads(data)
    # contract_print = json.dumps(contract_dictonary, indent=2)
    # print(contract_print)
    homeowner = contract_dictonary["homeowner"]["address"]
    # write the smart contract 
    contract_solidity_version ="// SPDX-License-Identifier: MIT\npragma solidity >0.4.17;"
    contract_function_start = "\ncontract Agreement{\n"
    contract_constructor = f"\n    address payable private homeowner = {homeowner};"

    contract_homeowner_function = f'''\n\n    function payRent(address payable _hOwner) external payable{{
        _hOwner.transfer(msg.value);
    }}'''

    contract_self_destruct = f'''\n\n    function close() public {{
        selfdestruct(homeowner);
    }}
    '''

    function_payable = f"\n\n    fallback() external payable{{}}"
    contract_begin = contract_solidity_version + contract_function_start + contract_constructor
    contract_end = contract_homeowner_function + contract_self_destruct + function_payable + "\n}"
    full_contract = contract_begin + contract_end
    return full_contract
    
    



class MyServer(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        data_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(data_length)
        payload = json.loads(post_data.decode("utf-8"))
        data = payload["data"]
        contract = write_smart_contract(data)
        print(contract)
        compiled_sol = compile_source(contract, output_values=['abi', 'bin'])
        contract_id, contract_interface = compiled_sol.popitem()
        bytecode = contract_interface['bin']
        abi = contract_interface['abi']
        response_dict = {"abi": abi, "bytecode": bytecode}
        response_string = json.dumps(response_dict)
        self.wfile.write(bytes(response_string, "utf-8"))



if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
