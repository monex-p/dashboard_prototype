import pandas as pd
import numpy as np
import json

def get_graph_data(loc, sheet_name):

    df = pd.read_excel(loc, sheet_name)
    # df = pd.read_excel(loc)

    df = df[['Loan Amount', 'Term', 'EP']]
    # df = df.dropna().reset_index()
    df.rename(columns = {"Loan Amount": "x", "Term": "y", "EP": "z"}, inplace=True)
    # df['colour'] = (df["z"] > 0).astype(int)

    result = df.to_json(orient='values')
    print(df)
    return json.loads(result)


if __name__ == '__main__': 
    loc = 'D:\\Epay\\Epay\\Dashboard\\CDE POC.xlsm'
    sheet_name = 'JS Data'
    json_file = get_graph_data(loc, sheet_name)
    filePathName = 'D:/Epay/Epay/Dashboard/dashboard_prototype/data/' + 'ep_surface_data' + '.json' 

    with open(filePathName, 'w') as fp:
        json.dump(json_file, fp)
