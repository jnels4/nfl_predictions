# nfl_predictions
ML project to determine NFL outcomes based on historical NFL data

## Purpose

Using machine learning to analyze historical NFL data in order to make predicitons about current/future NFL games.  

## Question

Can NFL outcomes be predicted using historical NFL data?


## Resources
- kaggle
- spreadspoke.csv
- Amazon S3
- google colabs
- python
- pandas
- nympy
- pyspark
- sklearn
- html
- javascript
- weather API


## Communication
- zoom
- slack
- google docs
- github

## Data Cleaning Process
1. Team decided to remove all data before 1979.  We did this for various reason, but mainly there was no weather data for most games before 1979.
2. Created a "home_win" column.  We then filled this with 2 or 1.  If home_score > away_score, the column got a 2, otherwise it recieved a 1.
3. Normalized the "weather_details" column. This column was either empty or filled with "DOME", so we replaced all instances of "DOME" with 1, and anything else with 0.
4. Removed unnecesary columns: 'schedule_date', 'schedule_season', 'schedule_week', 'schedule_playoff', 'team_favorite_id', 'stadium_neutral','weather_humidity', 'over_under_line'
5. Lastly dumped the cleaned dataframe into a pandas dataframe to work with our machine learning algorithms. 

## Machine Learning

Currently we are using "RandomOverSampler".  We are still deciding which model to settle on. 
 * balanced accuracy: 0.955 --> 95.5% 

SMOTE 
 * balanced accuracy: 0.955 --> 95.5% 

SMOTEEN 
 * balanced accuracy: 1 <-- this model will not be used. 

## Dashboard
- Javascript
- HTML
- Display winning percentage for home/away team
- Allow user to choose the home/away from drop down
- Display total games historically played by these teams for the given combination
- Link stadium (based on home team), display current local weather for stadium (weather API)

## Results

## Summary
