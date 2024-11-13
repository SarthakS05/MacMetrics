from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os
import datetime as dt
import seaborn as sns
import matplotlib.pyplot as plt
from functools import reduce
import numpy as np
price = {
    "Regular": 0,
    "Gluten-free": 0,
    "Cheddar": 0,
    "Pepper Jack": 0,
    "Alfredo": 0,
    "No Meat": 0,
    "Grilled Chicken": 1.99,
    "Pulled Pork": 1.99,
    "Brisket": 1.99,
    "Bacon": 1.99,
    "Ham": 1.99,
    "No Toppings": 0,
    "Broccoli": 0,
    "Corn": 0,
    "Onions": 0,
    "Jalapenos": 0,
    "Tomatoes": 0,
    "Bell Peppers": 0,
    "Mushrooms": 0,
    "Pineapple": 0,
    "Parmesan": 0,
    "Breadcrumbs": 0,
    "No Drizzle": 0,
    "BBQ": 0,
    "Garlic Parmesan": 0,
    "Buffalo": 0,
    "Pesto": 0,
    "Ranch": 0,
    "Hot Honey": 0,
    "No Side": 0,
    "Garlic Bread": 1.99,
    "Cheesy Garlic Bread": 1.99,
    "Cheesecake": 4.99,
    "Large Chocolate Chunk Cookie": 4.99,
    "Doritos": 1.99,
    "Cheetos": 1.99,
    "Lays Barbecue": 1.99,
    "Lays Classic": 1.99,
    "Cheesy Broccoli": 2.99,
    "No Drink": 0,
    "Water Bottle": 1.49,
    "Apple Juice": 2.49,
    "Coke": 1.99,
    "Dr. Pepper": 1.99,
    "Sprite": 1.99,
    "Diet Coke": 1.99,
    "Powerade (Blue Mountain Berry Blast)": 1.99,
    "Minute Maid Lemonade": 1.99
}

# app instance
app = Flask(__name__)
CORS(app)


@app.route("/api/home", methods=["GET"])
def return_home():
    return jsonify([
        { "Month": "January", "desktop": 186, "mobile": 80 },
        { "Month": "January", "desktop": 186, "mobile": 80 },
        { "Month": "January", "desktop": 186, "mobile": 20 },
        { "Month": "January", "desktop": 186, "mobile": 80 },
        { "Month": "January", "desktop": 186, "mobile": 50 }
    ])

folder_path = "data\datamonth"
months = ["january", "february", 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
files = [os.path.join(folder_path, file) for file in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, file))]
new_files = []
for i in months:
    for n in files:
        if i in n:
            new_files.append(pd.read_csv(n, index_col="Order ID", parse_dates=['Sent Date']))
files = new_files
for i in files:
    i["Date"] = i["Sent Date"].dt.date
    i["Time"] = i["Sent Date"].dt.time
    i["Time Points"] = i['Sent Date'].dt.hour * 3600 + i['Sent Date'].dt.minute * 60 + i['Sent Date'].dt.month * 1000000000+i['Sent Date'].dt.day * 1000000 + i['Sent Date'].dt.second


def additup(startRange='2000-10-01 10:42:00', endRange='2100-10-01 10:42:00'):
    base = files[0]
    for i in files:
        base = pd.concat([base, i])
    return base[(base['Sent Date'] >= dt.datetime.strptime(startRange, '%Y-%m-%d %H:%M:%S'))|(base['Sent Date'] <= dt.datetime.strptime(endRange, '%Y-%m-%d %H:%M:%S'))]
def additupMonths(months):
    try:
        base = months[0]
        for i in range(1+files.index(months[0]),files.index(months[:-1])):
            base = pd.concat([base, i])
    except:
        base = months
    return base
def group_it_up(df, tip):
    if(tip == "Main"):
        slatty = df[(df["Option Group Name"] == 'Noods') | (df["Option Group Name"] == 'Choose Your Melted Cheese') | (df["Option Group Name"] == 'Mix Bases')]
    elif(tip == "Cheese"):
        slatty = df[(df["Option Group Name"] == "Choose Your " + tip)|(df["Option Group Name"] == "Mix Bases")]
    elif tip == "Mac and Cheese Options":
        slatty = df[(df["Option Group Name"] == "Mac and Cheese Options")]
    else:
        slatty = df[(df["Option Group Name"] == "Choose Your " + tip)]
    return slatty
def howmanyTypes(df, col):
    df2= group_it_up(df, col)
    shits = (df2["Modifier"] != "No " + col)
    if(col in ["Meats", "Sides", "Drizzles"]):
        shits = shits&(df2["Modifier"] != "No " + col[:-1])
    else:
        shits = shits&(df2["Modifier"] != "No " + col)
    if(col == 'Cheese'):
        shits=shits&(df2["Modifier"] != 'MIX')
    return df2[shits].groupby('Modifier')['Order #'].count().sort_values(ascending = False)

def averages(df, col):
    
    return round(howmanyTypes(df, col)/len(files)).astype(int)
        
def income(series,col):
    d =series.to_dict()
    for i in d:
        d[i]=round(d[i]*price[i],2)
    return pd.Series(d).sort_values(ascending=False).iloc[:-1]
def weAintGotHours(df):
    df["Hours"] = df["Sent Date"].dt.hour
    df["strhours"] = df["Sent Date"].dt.strftime("%I %p")
    return df.groupby("strhours")["Order #"].count()
def weAintGotMonths(df):
    df["Month"] = df["Sent Date"].dt.month
    return df.groupby("Month")["Order #"].count()
def increments(df, hours=0, minutes=0, seconds=1):
    inc = hours*3600+minutes*60+seconds
    df["Increments"] = df["Time Points"]//inc
    if(hours != 0):
        df['Why'] = ((df["Sent Date"].dt.hour//hours)*hours).astype(str)
        df["IncTime"] = df["Why"]+":00:00"
    elif(minutes != 0):
        df['Why'] = ((df["Sent Date"].dt.minute//minutes)*minutes).astype(str)
        df["IncTime"] = df["Sent Date"].dt.hour.astype(str)+":"+df["Why"]+":00"
    elif(seconds != 0):
        df['Why'] = ((df["Sent Date"].dt.second//seconds)*seconds).astype(str)
        df["IncTime"] = str(df["Sent Date"].dt.hour)+str(df["Sent Date"].dt.minute)+str(df["Sent Date"].dt.second)
    return df
def prices(df):
    rows = []
    d = {}
    prices = pd.read_csv("ronis\data\ItemData.csv")
    for index, row in df.iterrows():
        
        if(row["Option Group Name"] == "Noods" or row["Option Group Name"] == "Choose Your Melted Cheese"):
            
            if d != {}:
                d["Price"] = round(d["Price"] *1.0625,2)
                rows.append(d)
            
            d = row[['Order #', 'Sent Date', 'Modifier', 'Parent Menu Selection', 'Option Group Name']].to_dict()
            
            d["Toppings"] = []
            d["Drink"] = []
            d["Side"] = []
            d["Meats"] = []
            d["Cheese"] = []
            d["Drizzles"] = []
            d["Do you want Mac and Cheese added inside?"] = False
            d["Price"] = 8.99
            
        else:
            try:
                if(row["Option Group Name"] == "Do you want Mac and Cheese added inside?"):
                    d["Do you want Mac and Cheese added inside?"] = True
                else:
                    d[row["Option Group Name"].split()[-1]].append(row['Modifier'])
                    if(row["Option Group Name"] == "Mac and Cheese Options"):
                        d['Price'] = 39.99
                    d['Price'] += price[row['Modifier']]
            except:
                pass
    return pd.DataFrame(rows) 
def cummulative(df, col):
    slatty = howmanyTypes(df, col)
    return slatty/slatty.sum()
def most(df):
    dict = {"Toppings":"", "Drink":"", "Drizzles":[], "Meats":"", "Cheese":"", "Side":""}
    for i in dict:
        dict[i] = list(howmanyTypes(df, i).to_dict().keys())[0]
    return dict
def sales(type):
    df = prices(additup())
    if(type == "total"):
        return (df['Price'].sum())
    elif(type == "monthly"):
        df['Month'] = df['Sent Date'].dt.month
        return df.groupby('Month')['Price'].sum()
    elif type == "biweekly":
        df['Month'] = df['Sent Date'].dt.month
        df.loc[df['Sent Date'].dt.day <= 15, 'Biweekly'] = 15
        df.loc[df['Sent Date'].dt.day > 15, 'Biweekly'] = 31
        return df.groupby(['Month', 'Biweekly'])['Price'].sum().sort_index(ascending=True)
    elif(type == "daily"):
        df['Month'] = df['Sent Date'].dt.month
        df['Day'] = df['Sent Date'].dt.day
       
        return df.groupby(['Month', 'Day'])['Price'].sum().sort_index(ascending=True)
    
def average_price(type):
    df = prices(additup())
    if(type == "total"):
        return (df['Price'].sum())
    elif(type == "monthly"):
        df['Month'] = df['Sent Date'].dt.month
        return round(df.groupby('Month')['Month','Price'].sum()/len(files), 2)
    elif type == "biweekly":
        df['Month'] = df['Sent Date'].dt.month
        df.loc[df['Sent Date'].dt.day <= 15, 'Biweekly'] = 15
        df.loc[df['Sent Date'].dt.day > 15, 'Biweekly'] = 31
        return round(df.groupby(['Month', 'Biweekly'])['Price'].mean().sort_index(ascending=True),2)
    elif(type == "daily"):
        df['Month'] = df['Sent Date'].dt.month
        df['Day'] = df['Sent Date'].dt.day
       
        return round(df.groupby(['Month', 'Day'])['Price'].mean().sort_index(ascending=True),2)
def restockRecommended(df):
    dict = {"Toppings":[], "Drink":[], "Drizzles":[], "Meats":[], "Cheese":[], "Side":[]}
    for i in dict:
        dict[i] = list(howmanyTypes(df, i).to_dict().keys())[0:5]
    return dict

@app.route("/api/toppings_chart", methods=["GET"])
def toppings_chart():
    d = howmanyTypes(additup(),'Toppings').to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])

@app.route("/api/drizzles_chart", methods=["GET"])
def drizzles_chart():
    d = howmanyTypes(additup(),'Drizzles').to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])
@app.route("/api/meats_chart", methods=["GET"])
def meats_chart():
    d = howmanyTypes(additup(),'Meats').to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])
@app.route("/api/cheese_chart", methods=["GET"])
def cheese_chart():
    d = howmanyTypes(additup(),'Cheese').to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])
@app.route("/api/noodles_chart", methods=["GET"])
def noodles_chart():
    d = howmanyTypes(additup(),'Main').to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])
    
@app.route("/api/catering_chart", methods=["GET"])
def catering_chart():
    d = howmanyTypes(additup(),'Mac and Cheese Options').to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])
    
@app.route("/api/salesPerMonth_chart", methods=["GET"])
def salesPerMonth_chart():
    d = sales('daily').to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])
@app.route("/api/meatIncome_chart", methods=["GET"])
def meatIncome_chart():
    d = income(howmanyTypes(additup(),'Meats')).to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])
@app.route("/api/sideIncome_chart", methods=["GET"])
def sideIncome_chart():
    d = income(howmanyTypes(additup(),'Side')).to_dict()
    return jsonify([
        {"Key":i, "Value":d[i]} for i in d
    ])
@app.route("/api/averageBowl_chart", methods=["GET"])
def averageBowl_chart():
    return average_price('total').to_dict()
    
@app.route("/api/test", methods=["GET"])
def return_test():
    return jsonify([
        { "Key": "Test", "Val": 72, "Val2": 20},
        { "Key": "Test2", "Val": 45, "Val2": 12},
        { "Key": "Test3", "Val": 23, "Val2": 32},
        { "Key": "Test4", "Val": 98, "Val2": 45},
        { "Key": "Test5", "Val": 65, "Val2": 65},
    ])

if __name__ == "__main__":
    app.run(debug = True, port=8080)
