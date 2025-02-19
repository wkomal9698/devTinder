# DevTinder APIs

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot password API

connectionRequestRouter
- POST /request/send/:status/:userId [status - interested / ignored]
- POST /request/review/:status/:requestId [status - accepted / rejected]

userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platforms

 
Status: ignored, interested, accepted, rejected