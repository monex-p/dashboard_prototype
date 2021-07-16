import numpy as np
import pandas as pd
import json
from scipy.stats import binom
from information_value import data_processing

def get_distribution_data(loc, sheet_name):
    df = pd.read_excel(loc, sheet_name, na_values = 0)
    sliced_df = df.iloc[:, 1:23]

    process_data = data_processing(sliced_df)

    new_columns = process_data[0]
    categories = process_data[1]

    count_list = []
    pd_list = []

    for i in range(len(new_columns)):

        if new_columns[i] not in categories:
            new_column_name = new_columns[i].replace(' ', '_').lower() + '_bins'

            sliced_df[new_column_name] = pd.cut(sliced_df[new_columns[i]], bins = 20)

            # height of bars - counts of each bin
            count_list.append(list(sliced_df['Default'].groupby(sliced_df[new_column_name]).count()))

            # average pd in each bin
            filtered_list = list(sliced_df['PD'].groupby(sliced_df[new_column_name]).mean())
            filtered_list = [0 if np.isnan(x) else x for x in filtered_list]
            pd_list.append(filtered_list)

        else:
            # height of bars - counts of each bin
            count_list.append(list(sliced_df['Default'].groupby(sliced_df[new_columns[i]]).count()))

            # average pd in each bin
            filtered_list = list(sliced_df['PD'].groupby(sliced_df[new_columns[i]]).mean())
            filtered_list = [0 if np.isnan(x) else x for x in filtered_list]
            pd_list.append(filtered_list)


    return count_list, pd_list


if __name__ == '__main__': 
    loc = 'D:\Epay\Epay\Dashboard\Proxy Payday Loan Data Corrected_Original.xlsx'
    sheet_name = 'Sheet1'

    json_file = get_distribution_data(loc, sheet_name)[0]
    filePathName = 'D:/Epay/Epay/Dashboard/dashboard_prototype/data/' + 'raw_count_list' + '.json' 

    with open(filePathName, 'w') as fp:
        json.dump(json_file, fp)

    json_column_file = get_distribution_data(loc, sheet_name)[1]
    fileName = 'D:/Epay/Epay/Dashboard/dashboard_prototype/data/' + 'raw_pd_list' + '.json' 

    with open(fileName, 'w') as fp:
        json.dump(json_column_file, fp)


