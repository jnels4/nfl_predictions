# Overview

The purpose of this project is to use our data filled with previous NFL games to predict current, future, and hypothetical team match ups.  In order to do so, the use of machine learning is ideal as it had the ability to learn from its previous uploaded data and predict potential outcomes. Many people wonder, which teams going to win? It will take into account home team advantage, whether or not the stadium is domed or outdoors, and weather. Home team advantage is important to take into account as teams playing in a stadium their comfortable with as they are surrounded by plenty of supportive fans and are acclimated with the playing conditions. Another important factor taken into consideration is stadium: some are domed (it has set climate conditions) and outdoor stadiums that are heavily impacted by weather. 

Our project is classified as supervised machine learning, as it trains the model to find certain patterns in the data. Supervised learning, uses the labels, targets, and features in the tested model, in order to predict new data in the trained model. 

# Contributors

[Brittaney Kura](https://github.com/Brit0812)

[John Nelson](https://github.com/jnels4)

[Rob Berger](https://github.com/berg0804) 

# Resources 

•	[Kaggle](https://www.kaggle.com/datasets/tobycrabtree/nfl-scores-and-betting-data?resource=download&select=spreadspoke_scores.csv)

•	spreadspoke.csv

•	Amazon S3

•	google colabs

•	python

•	pandas

•	nympy

•	pyspark

•	sklearn

•	html

•	javascript

# Communication

When trying to figure out a game plan, communication is essential: zoom and slack have been our primary forms of communication. We also have a google docs set up, where we’ve created checklists for each week in order to stay on track. Google Colab is another form of communication: as its where we have added additional code, made notes on corrections, put forward ideas and so forth. 


# Data Cleaning Process

•	As we were going through the spreadspoke.csv, we looked at each column and determined the columns that were useful and what would unnecessary.  

•	We also removed data prior to 1979, the reason for a large chunk of data being removed was because most of the data we needed was empty. If we were to place N/As or null values, it would have a negative impact on our data and our outcomes. 

•	A list was created to see each column, this is important as it allows us to filter through each column with ease. When it’s a list were able to say “well, ‘schedule_date' isn’t important to us as the dates of the games will have no impact on the outcome of the game. A Thursday night in 1989 won’t tell us the probability of the New York Jets winning, therego it can be removed”. 

•	The columns that were removed were: ‘schedule_date', 'schedule_season', 'schedule_week', 'schedule_playoff', 'team_favorite_id', 'stadium_neutral','weather_humidity', 'over_under_line'.

•	An additional column “home_win” was added. This column was binary, as it adds a 2 if the “home_score” was greater than the “away_score”” signifying a home team win, otherwise there’s a 1. 

•	Another column had been added “weather_details”, which replaced “DOME” with a 1 and anything else was a 0. 

   * This was done to both the “home_win” and “weather_details” as it makes it easier to be processes in the machine learning model, since it’s been converted to binary format. 


•	Once the data had been cleaned and preprocesses: the removal of unnecessary columns and rows, adding columns with contained binary formatting, and running though the data to find anymore discrepancies that may cause errors down the line the data was then converted to a DataFrame. 


•	Another DataFrame was made to represent each team’s overall win percentage. Each team had the sum of their wins and losses pulled from a binary list. A win and loss percentage was then calculated for each team.
   


Image of the code 

•	Since we converted the new cleaned data and historical data into a DataFrame, we were able to convert them into .jsons. This would be needed when creating a .html, as it would allow us to import our new dfs to the website. 


o	Image of .json conversion 

#  Machine Learning and Their Results 

When using machine learning, it’s important to find a model that would be best suited for your sample. We initial chose 2 teams, the New York Jets and the Buffalo Bills, to run our preliminary tests on. 

* For example, SMOTE is best used for oversampling and imbalances. If one feature/class were to be underrepresented, this could impact your model giving you inaccurate accuracies. SMOTE will essentially generate new instances for the data, thus improving your model’s accuracy. 


   * A confusion matrix was made, which is a table with the distribution classifiers summary on the data. The matric will assist in the evaluation of the model, allowing us to see how well the model is performing, or not, so we can make adjustments as needed. 

   * This model wasn’t needed for our purposes, but the test was still run. The model’s balanced accuracy was a 95.5%. 

•	Random Forest Classifier, is another machine learning model, that’s incredibly versatile as its able to provide great solutions to intricate problems. When running this model, no scaling is required, but could be done, and the model will provide a great accuracy (if warranted). When this model is run it creates decision trees that predict possible outcomes. For example, if there’s a fork in the road will the person go to the left or right? If they go to the left they may find a town, but if they go to the right they might find a metropolis. While that example is very basic, the decision tree can be intricate and could help find the best possible outcome. This model helps reduce overfitting the dataset, will work with missing data, and provides a great accuracy. 

   * This model was going to be our primary mechanism in our machine learning, as it had a decent accuracy and is historically reliable. But, we decided to go a different route as we noticed our model may be underfitting. 

   * Random Forest Classifiers accuracy for few of the outputs were inaccurate or gave us a 1. To correct this, we noticed some of the teams had their old names, meaning, the teams moved to another state/city or they completely renamed their teams. For example, the ‘Washington Redskins’ had a name change to the Washington Football team in 2020. A majority of the data from 1979 to 2019 knew the team’s name as the ‘Washington Redskins’ causing the ‘Washington Football team’ to have a small amount of data. Since there was a small amount of data, the model found it difficult to provide an accurate prediction. Merging the 2 names together, was a solution to this issue.

 This correction was applied to: 'St. Louis Rams' to 'Los Angeles Rams', 'St. Louis Cardinals' to 'Arizona Cardinals', 'St. Louis Cardinals' to 'Arizona Cardinals', 'Oakland Raiders' to 'Las Vegas Raiders', 'Los Angeles Raiders' to 'Las Vegas Raiders', 'Houston Oilers' to 'Tennessee Titans', 'Tennessee Oilers' to 'Tennessee Titans', 'San Diego Chargers' to 'Los Angeles Chargers', and 'Baltimore Colts' to 'Indianapolis Colts'. 

	OR add an image of the code######

   * After applying the correction, the accuracy had improved, but there was still the possibility of underfitting. 

   * The ‘New York Jets’ vs the ‘Buffalo Bills’ run through, had an accuracy of 95%.

•	XGBoost also known as Extreme Gradient Boosting, is similar to that of the Random Forest Classifier, while both place their priorities on different aspects of the data they both assist in the data correction. Random Forest Classifiers help reduce overfitting and variance. On the other hand, XGBoost is great at reducing bias and underfitting. 

   * This model was made our primary model as it improved the accuracy and addressed the issue of underfitting. When there’s the issue of underfitting, it means the model is not able to correctly capture the relationship between the inputs and outputs. 

   * Once we fit the model, after testing the model with the ‘New York Jets’ vs the ‘Buffalo Bills’ we found our accuracy improved slightly to 97%.



# Dashboard 

When creating the dashboard, we decided to go with HTML, and start from the beginning. We added an NFL background, which was added to our style.css, along with other the font of our jumbotron and their colors. The addition of a dropdown menus was crucial, as it allowed those using the predictor to pull the 2 teams they’d like to see. 

# CODE IMAGE HERE 

Originally, there was another background covering the NFL background, in order to correct this the 2nd background was made transparent, using “bg-transparent’ rather than “bg- info”. 

# New image of code here- with the correction of the transparent

In the final version of the HTML, those using the prediction model will be able to their home and away teams from the drop-down menus. Once they pick their 2 teams, a small display will appear with the stadium they’re playing in. Another larger display will have a gauge, where it shows the odds of the home team winning. 

# image of actual dashboard

# Summary 

Once we found model that best suited out data and need, we then applied the model to the whole dataset. In order to do this, we created a for loop, that would take the home team from the home team list (Team H) and a visiting team from the visiting team list (Team A) and place it into a DataFrame. The 2 teams that were pulled are then placed in their perspective teams, H or A, the for loop then goes onto the preprocessed data that’s then split in to features (X) and target (y) arrays. After the X and y training/testing sets are split, using train_test_split and setting a random_state of 1, we then began to fit our model. 

# for loop image


Multiple models were used and the one that proved to be the most beneficial was XGBoost, giving an accuracy of 67%! While this isn’t the most accurate, it does provide a solid baseline to build upon. A possible issue with our model may be a lack of data, especially between certain teams. When running the loop, an issue we noticed was a few teams facing one another were missing completely. When looking through the CSV we noticed certain games were missing. 
The ‘Los Angeles Rams’ and the ‘Los Angeles Charges’ have played one another 12 times, since 1970! Since we removed the data prior to 1979, there should be 10 games total, but our data doesn’t have these games. While some of the teams playing one another are completely missing, some are paired together, but yield a 0% accuracy. This brings back the issue of not having enough data to provide an accurate prediction. In order to correct this issue, we would have to find the missing data and merge it with our primary df. 

If the data were to include more specific columns that would impact a game’s outcome, it might be able to gauge the accuracy better. An example would be individual player states, touch downs, yardage, team defense, the model would be able to provide a more accurate output. 

When running through the models, we should have tested more teams than just ‘New York Jets’ vs the ‘Buffalo Bills’, since they already had a high yield across all the models. If we would have used another team we noticed had a fairly low accuracy, we may have been able to provide better judgment on which model to use. 


![image](https://user-images.githubusercontent.com/67160240/190254834-b0bb4f9f-3536-4dd4-98fb-bcc7ccbed535.png)
