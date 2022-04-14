from calendar import month
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from web3 import Web3
from solcx import compile_source

hostName = "localhost"
serverPort = 9000

def write_contract_variables(homeowne_addr, tenants):
    homeowner_var = f"address payable homeowner = {homeowne_addr};"
    tenent_var_holder = ""
    current_tenent_vars = tenent_var_holder

    for tenent in tenants:
        tenent_addr = tenent["address"]
        tenent_var_holder =f"address tenent1 = {tenent_addr}\n;"
        current_tenent_vars += tenent_var_holder

    return homeowner_var + current_tenent_vars

def write_tenent_portion(tenants):
    tenent_num = 1
    tenent_portion = ""
    current_tenent_portion = tenent_portion
    for tenent in tenants:
        tenent = write_single_tenent_function(tenent_num)
        current_tenent_portion+=tenent

    return current_tenent_portion

def write_single_tenent_function(num):
    tenent_func = f'''
    withdraw{num}()
    {{ 
        require(now + 3 seconds); 
        msg.address{num}.transfer.address(this);
        collect();
    }}\n
    '''
    return tenent_func

def write_smart_contract(data):
    contract_dictonary = json.loads(data)
    contract_print = json.dumps(contract_dictonary, indent=2)
   # print(contract_print)
    homeowner_address = contract_dictonary["homeowner"]["address"]
    print(homeowner_address)
    #tenants = contract_dictonary["tenants"]

    # write the smart contract 
    #contract_solidity_version ="pragma solidity pragma solidity >=0.4.17;\n"
    #contract_variables = write_contract_variables(homeowner_address,tenants)
    #contract_function_start = "contract Agreement{\n"
    #contract_homeowner_function = "collect(){msg.address(this).tranfer(homeowner);}"
    #contract_tenent_portion = write_tenent_portion(tenants)
    #contract_begin = contract_solidity_version + contract_variables + contract_function_start
    #contract_end = contract_homeowner_function + contract_tenent_portion + "}"
    #full_contract = contract_begin + contract_end
    #return full_contract
    
    



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
        #compiled_sol = compile_source(contract, output_values=['abi', 'bin'])
        #contract_id, contract_interface = compiled_sol.popitem()
        #bytecode = contract_interface['bin']
        #abi = contract_interface['abi']
        #response_dict = {"abi": abi, "bytecode": bytecode}
        #response_string = json.dumps(response_dict)
        #self.wfile.write(bytes(response_string, "utf-8"))



if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
