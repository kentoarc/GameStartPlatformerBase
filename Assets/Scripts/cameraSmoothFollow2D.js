// Camera Smooth Follow 2D - Optional Zooming
// GameStart
// July 14, 2014
// Description: smoothly follows a cameraTarget with the abbility to zoom in on them
// Instruction: Assign to a ccamera and choose either player or focus point for camera cameraTarget

var cameraTarget				: GameObject;					// object to look at or follow
var player						: GameObject;					// player object for moving

var smoothTime					: float		= 0.1;				// time for camera to dampen
var cameraFollowX				: boolean	= true;				// camera follows on horizontal
var cameraFollowY				: boolean	= true; 			// camera follow on vertical
var cameraFollowHeight			: boolean	= false;			// camera will follow cameraTarget 
var cameraHeight				: float		= 2.5;				// height of the camera adjustible in the inspector
var velocity					: Vector2;						// speed of camera movement

var cameraZoom					: boolean	= false;			// toggle for toom in and out, othrographic size
var cameraZoomMax				: float		= 2.5;				// min amount that the camera can pull in
var cameraZoomMin				: float		= 4.0;				// max amount that the camera can pull in
var cameraZoomTime				: float		= 0.03;				// speed for camera zooming

private var thisTransform		: Transform;					// Cameras transform

private var curPos				: float		= 0.0;				// current position of the camera target
private var playerJumpHeight	: float		= 0.0;				// store player jump


function Start ()												// intialize
{
	thisTransform = transform;
}

function Update () 												// loop
{
	if ( cameraFollowX )										// enable x horizontal movement direction
	{
		thisTransform.position.x = Mathf.SmoothDamp(thisTransform.position.x, cameraTarget.transform.position.x, velocity.x, smoothTime);
	}
	if ( cameraFollowY )										// enable y vertical movement direction
	{
		thisTransform.position.y = Mathf.SmoothDamp(thisTransform.position.y, cameraTarget.transform.position.y, velocity.y, smoothTime);
	}
	if ( !cameraFollowY && cameraFollowHeight )					// enable controlled  (verticle) direction based on camera height
	{
		camera.transform.position.y = cameraHeight;				// sets current camera y to cameraHeight var
	}
	
	var playerControl = player.GetComponent(playerControls);	// get players current starting jump position from playerControls.js
	
	if ( cameraZoom )											// if cameraZoom is true, allow it to move back based on jump height
	{
		curPos = player.transform.position.y;					// set the current position to the players current y position
		playerJumpHeight = curPos - playerControl.startPos; 	// subtracting the current height from the player control start position
		
		if ( playerJumpHeight < 0 )								// make sure it stays a positive number
		{
			playerJumpHeight *= -1;								// if -, then multiply it by -1 to makee it positive
		}
		if ( playerJumpHeight > cameraZoomMax )					// make a limit to the camera distance back
		{
			playerJumpHeight = cameraZoomMax;					// equals max if it attempts to go to far
		}
		
		this.camera.orthographicSize = Mathf.Lerp ( this.camera.orthographicSize, playerJumpHeight + cameraZoomMin, Time.deltaTime * cameraZoomTime );
		
	}
	
	
	
}