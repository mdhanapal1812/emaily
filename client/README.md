Feedback collector !

Front-End: React , React-Redux , HTML , CSS.
Back-End : MongoDB, Mongoose.
Notable services used: Google OAuth , Stripe , SendGrid
Some business owner uses this service as he/she wants to collect feedback from his customers. So this application allows the owner to send customers an email requesting for feedback. This way , the owner can improve his/her business. This is a credit based application as the number of surveys that the owner can create depends on the number of credits that the owner has earned to use this service. For earning credits , the owner need to pay a certain amount (5$ for 5 credits in this application). For Authentication , I have used Google OAuth. For payments I have used Stripe service and for mailing I have used SendGrid. The state managements in this application are managed through Redux. Form validations of the surveys are also done.

Steps followed in this application : - User signs up via Google OAuth. - User creates a new 'survey list' intended for getting feedback for his business product. - User enters a list of emails to send survey . - We send email to list of surveys through sendgrid. - Surveyees click on link in email to provide feedback. - User can see report of all survey responses.

