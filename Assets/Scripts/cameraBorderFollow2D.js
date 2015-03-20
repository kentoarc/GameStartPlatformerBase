var cameraTarget			: GameObject;			// object to look at or follow
var player					: GameObject;			// player object for moving

var cameraHeight			: float		= 0.0;		// height of the camera and is adjustable in inspector
var smoothTime				: float		= 0.2;		// time for the camera to catch up
var borderX					: float		= 2.0;		// border for x
var borderY					: float		= 2.0;		// border for y

private var velocity		: Vector2;				// speed of camera movement
private var moveScreenRight	: boolean	= false;	// move screen right check
private var moveScreenLeft	: boolean	= false;	// move screen left check

function Start ()									// intialize
{
	cameraHeight = camera.transform.position.y;		// height of camera starting position
}

function Update ()
{
	var moveDir = player.GetComponent( playerControls );	// get player from playerControls.js
	
	if ( cameraTarget.transfrom.position.x > camera.transfrom.position.x + borderX && moveDir.moveDirection == 1)	// if player is at the right edge 
	{
		moveScreenRight = true;
	}
	if ( moveScreenRight )
	{
		camera.transfrom.position.x = Mathf.SmoothDamp ( camera.transfrom.position.x, camera.transform.postion.x + borderX, velocity.y, smoothTime );	// adjust vertical
	}
	if ( cameraTarget.transform.position.x < camera.transform.position.x - borderX && moveDir.moveDirection == 1 )										// if the player is not at the border
	{
		moveScreenRight = false;
	}
	if ( cameraTarget.transform.position.x < camera.transform.position.x - borderX && moveDir.moveDirection == 0 )										// if player is at the left edge
	{
		moveScreenLeft = true;
	}
	if ( moveScreenLeft )
	{
		camera.transform.position.x = Mathf.SmoothDamp ( camera.transform.position.x, camera.transform.position.x - borderX, velocity.y, smoothTime); 	// adjust to the left hand side
	}
	if ( cameraTarget.transform.position.x > camera.transform.position.x + borderX && moveDir.moveDirection == 0 )										// if player is on the edge
	{
		moveScreenLeft = false;
	}
	camera.transform.position.y = cameraHeight;																											// this is for adjusting the height in the inspector
}
