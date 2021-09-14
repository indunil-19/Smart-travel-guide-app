# Smart Travel Guide App


## PROJECT ID: PID4


## Project name : Travel guide application
The objective of this project is to develop a smart travel guide mobile application for Sri
Lanka.


First clone this project directory.

   ```https://github.com/indunil-19/Smart-travel-guide-app```
   
   
Then Go to the project Directory
  ```cd directory/project ```
 
 The system has main 3 components:
  1. Back End server
  
      To configure server first goto adminPortal directory
          ```cd directory/server ```
      Then run ```npm install ```
       Then use nodemon or node to start server.Nodemon is recommended
 
       ```
       nodemon start # If nodemon is installed
       node index.js # otherwise
      ```

      Then console will display 'app is working on port 5000'
 2. Admin portal
    
    To configure server first goto adminPortal directory
          ```cd directory/adminPortal ```
          
      Then run ```npm install ```
       
      After run 
          ```npm start ``` to run react app
         
      Now visit http://localhost:3000/ and confirm that admin portal is running.
      
 3. Mobile app
    
    To configure mobile app goto smart_travel_guide directory
    
        cd directory/smart_travel_guide directory 
        
    Then run 
    
         expo install  or npm install 
    
    
    To connect with back end you need to install ngrok for exposes local server ports to the Internet.(https://www.npmjs.com/package/ngrok)
    
    ``` npm install ngrok```
    
    Then run ```ngrok http 5000``` 
    
    ![Image of ngrok](https://raw.githubusercontent.com/indunil-19/Smart-travel-guide-app/main/Server/ss/Capture.PNG?token=APG2BMQ6BTHSUQMPPG5MM4DBIBKNG)

    Copy the port forwarding url and update Localhost in config.js line 2 
    in dirctory/Smart-travel-guide-app/smart_travel_guide/src/config
    
    This maps mobile app http requests to back end server port 5000
    
    
    Then run ```expo start```  for more instructions refer (https://docs.expo.dev/get-started/create-a-new-app/#starting-the-development-server)
    
    You can see the mobile app running on your android device or emulater


    
      
      
 
    
    
    
    
    
    
    
    
    
    
    
    
