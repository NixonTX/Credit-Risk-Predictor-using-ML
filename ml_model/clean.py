import pandas as pd
import os

file_path = os.path.join(os.path.dirname(__file__), 'loan_data.csv')

df = pd.read_csv(file_path)

df.columns = df.columns.str.strip()

df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

cleaned_file_path = os.path.join(os.path.dirname(__file__), 'cleaned_loan_data.csv')
df.to_csv(cleaned_file_path, index=False)

print(f"Cleaned data saved to {cleaned_file_path}")
