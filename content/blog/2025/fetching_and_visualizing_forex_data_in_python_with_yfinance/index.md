---
title: 'Fetching and Visualizing Forex Data in Python with yfinance'
tags: ['fintech', 'python', 'seaborn', 'yfinance']
date: '2025-03-21T10:50:47.000'
description: 'Forex with yfinance'
category: 'Finance'
---

I am preparing for a Forex-related interview, so after some research, I’ve summarized how to get Forex data in Python. In this blog, we will use `yfinance` and `seaborn` to fetch hourly exchange rates for **EUR/USD**, check the data quality, and finally, plot the closing prices in a line plot.

## Install Packages

To get started, we need the following packages:

- [yfinance](https://github.com/ranaroussi/yfinance): to fetch Forex data
- [matplotlib](https://matplotlib.org/): for plotting
- [seaborn](https://seaborn.pydata.org/): for enhanced plotting with better visualization

```bash
pip install yfinance matplotlib seaborn
```

## Fetch the Data

```python
import yfinance as yf
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_style("whitegrid")

# Define the forex pair and date range
pair = "EURUSD=X"
# Define the start date and end date
start_date = "2024-01-01"
end_date = "2024-12-31"
# Define the interval
interval = '1h'

# Fetch forex data
forex_data = yf.Ticker(pair)


# Fetch historical forex data
data = forex_data.history(start=start_date, end=end_date, interval=interval)

# Data overview
data.info()

"""Output
<class 'pandas.core.frame.DataFrame'>
DatetimeIndex: 6178 entries, 2024-01-01 18:00:00+00:00 to 2024-12-30 23:00:00+00:00
Data columns (total 7 columns):
 #   Column        Non-Null Count  Dtype
---  ------        --------------  -----
 0   Open          6178 non-null   float64
 1   High          6178 non-null   float64
 2   Low           6178 non-null   float64
 3   Close         6178 non-null   float64
 4   Volume        6178 non-null   int64
 5   Dividends     6178 non-null   float64
 6   Stock Splits  6178 non-null   float64
dtypes: float64(6), int64(1)
"""
```

## Data Quality Check

### Missing values

We can check the missing values by

```python
data.isna().sum()

""" Output
Open            0
High            0
Low             0
Close           0
Volume          0
Dividends       0
Stock Splits    0
dtype: int64
"""
```

No missing values, nice :)

### Removing Irrelevant Columns

Upon closer inspection, we notice that the `Volume`, `Dividends`, and `Stock Splits` columns have all values equal to 0. These columns are not useful for our analysis, so let's drop them.

```python
cols = ['Volume', 'Dividends','Stock Splits']
(data[cols] == 0).all()

""" Output
Volume          True
Dividends       True
Stock Splits    True
dtype: bool
"""

data.drop(columns= cols, inplace = True)

```

After this, we have a cleaned DataFrame.

```python
data.info()

""" Output
DatetimeIndex: 6178 entries, 2024-01-01 18:00:00+00:00 to 2024-12-30 23:00:00+00:00
Data columns (total 7 columns):
 #   Column        Non-Null Count  Dtype
---  ------        --------------  -----
 0   Open          6178 non-null   float64
 1   High          6178 non-null   float64
 2   Low           6178 non-null   float64
 3   Close         6178 non-null   float64
 4   Volume        6178 non-null   int64
 5   Dividends     6178 non-null   float64
 6   Stock Splits  6178 non-null   float64
dtypes: float64(6), int64(1)
"""
```

## Data Visulazation

We will now use `seaborn` to plot the hourly closing prices.

```python
import seaborn as sns
import matplotlib.pyplot as plt

# Set up the plot style
sns.set_style("whitegrid")
plt.figure(figsize=(12, 6))

# Plot the hourly closing prices
sns.lineplot(x=data.index, y=data["Close"])

# Formatting the plot
plt.xlabel("Date")
plt.ylabel("EUR/USD Hourly Closing Price")
plt.title("EUR/USD Hourly Closing Price (2024)")
plt.xticks(rotation=45)
plt.show()
```

This will generate a line plot showing the hourly closing prices for the EUR/USD pair in 2024.

<img
	src={forex_plot.src}
	alt='EUR/USD Hourly Closing Price (2024)'
	className='rounded-lg hover:scale-[1.01] drop-shadow-xl'
/>

![EUR_USD_Hourly_Closing_Price_2024](EUR_USD_Hourly_Closing_Price_2024.png)

## Conclusion

In this blog, we learned how to fetch Forex data using the `yfinance` library, cleaned the dataset by removing irrelevant columns, and visualized the EUR/USD hourly closing prices with `seaborn`. This simple step can serve as the foundation for more complex Forex analysis and hedging strategies.
