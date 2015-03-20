// Player Controller		- 2D Mario Clone
// Description: Provides a 2D character with basic movement (idle, crouch, walk, run, jump, run jump, crouch jump)
// Designed to quickly get up and going with a super mario bros. style control scheme
// Uses Input and is set for joystick and keyboard (w,a,s,d, arrows, spacebar, control)
// Control Scheme:
// a or left arrow 			- Move Left
// d or right arrow			- Move Right
// s or down arrow			- Crouch
// spacebar					- Standard Jump	- 'Jump' button
// ctrl + spacebar			- Run Jump		- 'Fire1' button
// s + spacebar				- Crouch Jump
// press down on tube		- Tube Activate

var walkSpeed 					: float 	= 1.5;							// speed of standard walk
var runSpeed 					: float 	= 2.0;							// speed of run
var fallSpeed 					: float 	= 2.0;							// speed of falling down
var walkJump 					: float 	= 6.2;							// jump height from walk
var runJump 					: float 	= 9.0;							// jump height from run
var crouchJump 					: float 	= 10.0;							// jump height from crouch
var gravity 					: float 	= 20.0;							// force applied on character
var startPos					: float		= 0.0;							// location for start position
var moveDirection				: int 		= 1;							// direction player facing

var particleJump				: Transform;								// particle for the feet hitting the ground

var anim						: Animator;

var soundJump					: AudioClip;								// audio clip for jump
var soundCrouchJump				: AudioClip;								// audio clip for the crouch jump

var lives						: int		= 5;							// Player lives

var sceneManager				: GameObject;								// load the manager script for deaths

private var soundRate			: float		= 0.0;							// variable holds current time + delay amount
private var soundDelay			: float		= 0.0;							// the amount to delay for playing sound
private var velocity 			: Vector3 	= Vector3.zero;					// speed of player and direction
private var jumpEnable 			: boolean 	= false;						// toggle for jump standard
private var runJumpEnable 		: boolean 	= false;						// toggle for run jump
private var crouchJumpEnable	: boolean 	= false;						// toggle for crouch jump
private var afterHitForceDown	: float		= 1.0;							// force player down if head hits anything

function PlaySound (soundName, soundDelay )
{
return;
	if ( !audio.isPlaying && Time.time > soundRate )
	{
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
		yield WaitForSeconds (audio.clip.length);
	}	
}

function Start ()
{
	anim = gameObject.GetComponent(Animator);
}

function Update()
{
	var particlePlacement : Vector3 = Vector3 ( transform.position.x, transform. position.y -.5, transform.position.z ); // set particle at the base of the sprite
	var controller : CharacterController = GetComponent( CharacterController ); //set controller to characters controller
	
	var newScale;
	
	if( controller.isGrounded )											// if player is on the ground
	{
		jumpEnable			= false;									// resets jumps
		runJumpEnable 		= false;									// resets jumps
		crouchJumpEnable	= false;									// resets jumps
		
		startPos			= transform.position.y;						// this is for the camera to subtract from on zooming in and out
		
		anim.SetBool("crouch", false);
		anim.SetFloat("jumpSpeed", Mathf.Abs(velocity.y));
		anim.SetFloat("crouchJumpSpeed", Mathf.Abs(velocity.y));
		anim.SetFloat("runSpeed", Mathf.Abs(velocity.x));
		anim.SetFloat("runJumpSpeed", Mathf.Abs(velocity.y));
		
		velocity = Vector3 ( Input.GetAxis ( "Horizontal" ) , 0, 0);
		
		if ( velocity.x == 0 && moveDirection == 1)						// Idle right
		{
			Debug.Log ("Idle Right");									// Animation call to idle right
		}
		if ( velocity.x == 0 && moveDirection == 0)						// Idle left
		{
			Debug.Log ("Idle Left");									// Animation call to idle left
		}
		if ( velocity.x < 0 )											// Walk Left
		{
			velocity *= walkSpeed;										// Moved left based on walkSpeed
			anim.SetFloat("walkSpeed",Mathf.Abs(velocity.x));			// Set float parameter "wSpeed" in the animator
			newScale = transform.localScale;							// Set newScale to the local transform
			newScale.x = -1.0f;											// flips the sprite to look left
			transform.localScale = newScale;							// Animation call to walk left
			Debug.Log ("Walking Left");
		}
		if ( velocity.x > 0 )											// Walk Right
		{
			velocity *= walkSpeed;										// Move right based on walkSpeed
			anim.SetFloat("walkSpeed",Mathf.Abs(velocity.x));			// Set float parameter "walkSpeed" in the animator	
			newScale = transform.localScale;							// Set newScale to the local transform
			newScale.x = 1.0f;											// flips the sprite to look right
			transform.localScale = newScale;							// Animation call to walk right
			Debug.Log ("Walking Right");
		}
		if ( velocity.x < 0 && Input.GetButton ("Fire1"))				// Run left
		{
			velocity *= runSpeed;										// Move left based on runSpeed
			anim.SetFloat("runSpeed",Mathf.Abs(velocity.x));
			Debug.Log ("Running Left");									// Animation call to run left
		}
		if ( velocity.x > 0 && Input.GetButton ("Fire1"))				// Run right
		{
			velocity *= runSpeed;										// Move right based on runSpeed
			anim.SetFloat("runSpeed",Mathf.Abs(velocity.x));
			Debug.Log ("Running Right");								// Animation call to run right
		}
		if ( velocity.x == 0 && Input.GetAxis ("Vertical") < 0)
		{
			if ( moveDirection == 0 )									// Crouch left
			{
				velocity.x = 0;											// Keep player from moving
				anim.SetBool("crouch", true);							// Animation call to crouch
				newScale = transform.localScale;						// Set newScale to the local transform
				newScale.x = -1.0f;										// flips the sprite to look right
				transform.localScale = newScale;
				Debug.Log ("Crouching left");
			}
			if ( moveDirection == 1 )									// Crouch right
			{
				velocity.x = 0;											// Keep player from moving
				anim.SetBool("crouch", true);							// Animation call to crouch
				newScale = transform.localScale;						// Set newScale to the local transform
				newScale.x = 1.0f;										// flips the sprite to look right
				transform.localScale = newScale;
				Debug.Log ("Crouching right");
			}
		}
		
		if ( Input.GetButton ( "Jump" ) && (!Input.GetButton ( "Fire1" ) || Input.GetButton ( "Fire1") && velocity.x == 0 ) && Input.GetAxis ("Vertical") >= 0)
		{
			velocity.y = walkJump;												// setting the y value to walkJump
			Instantiate (particleJump, particlePlacement, transform.rotation);	// creates the particle effect when jumping
			PlaySound ( soundJump, 0 );											// play sound for jump
			anim.SetFloat("jumpSpeed", Mathf.Abs(velocity.y));
			jumpEnable = true;													// enable jump standard
		}
		
		if ( Input.GetButtonDown ( "Jump" ) && Input.GetButton ( "Fire1" ) && velocity.x != 0 )
		{
			velocity.y = runJump;												// setting the y to the runJump
			Instantiate (particleJump, particlePlacement, transform.rotation);	// creates particle effect when jumping
			PlaySound ( soundJump, 0 );											// play sound for jump
			anim.SetFloat("runJumpSpeed",Mathf.Abs(velocity.y));
			runJumpEnable = true;												// enable run jump
		}
		if ( Input.GetButtonDown ("Jump") && velocity.x == 0 && Input.GetAxis ("Vertical") < 0)
		{
			velocity.y = crouchJump;											// setting y to the crouchJump
			Instantiate (particleJump, particlePlacement, transform.rotation);	// creates particle effect when jumping
			PlaySound ( soundCrouchJump, 0 );									// play sound for crouch jump
			anim.SetFloat("crouchJumpSpeed", Mathf.Abs(velocity.y));
			crouchJumpEnable = true;											// enable the crouch jump
		}
	}
	
	if ( !controller.isGrounded )							// if player is in the air
	{
		velocity.x = Input.GetAxis ( "Horizontal" );		// set the horizontal speed from input

		if( Input.GetButtonUp ( "Jump" ))					// jump controlled height
		{
			velocity.y = velocity.y - fallSpeed;			// subtract current height from 1 if jump button is up
			
		}
		
		if (moveDirection == 0)								// facing left
		{
			if (jumpEnable)									// jump left standard
			{
				velocity.x *= walkSpeed;					// walk speed * current move speed
				Debug.Log ("Standard Jumping Left");		// Animation call to standard left jump	
			}
			if (runJumpEnable)								// run left jump 
			{
				velocity.x *= runSpeed;						// run speed * current move speed
				Debug.Log("Run Jumping Left");				// Animation call to Run left Jump
			}
			if (crouchJumpEnable)							// jump from left crouch
			{
				velocity.x *= walkSpeed;					// walk speed * current move speed
				Debug.Log("Crouch Jumping Left");			// Animation call to left crouch jump
			}
		}
		
		if (moveDirection == 1)								// facing right
		{
			if (jumpEnable)									// jump right standard
			{
				velocity.x *= walkSpeed;					// walk speed * current move speed
				Debug.Log ("Standard Jumping Right");		// Animation call to standard right jump
			}
			if (runJumpEnable)								// run right jump 
			{
				velocity.x *= runSpeed;						// run speed * current move speed
				Debug.Log("Run Jumping Right");				//Animation call to Run right Jump
			}
			if (crouchJumpEnable)							// jump from right crouch
			{
				velocity.x *= walkSpeed;					// walk speed * current move speed
				Debug.Log("Crouch Jumping Right");			// Animation call to crouch right jump
			}
		}

	}
	
	if ( velocity.x < 0 )									// Get last move direction - left
	{
		moveDirection = 0;									// Set moveDirection Left
	}
	if ( velocity.x > 0 )									// Get last move direction - right
	{
		moveDirection = 1;									// Set moveDirection Right
	}
	
	if (controller.collisionFlags == CollisionFlags.Above)
	{
		velocity.y = 0;										// set velocity on y to 0, stops upward motion
		velocity.y -= afterHitForceDown;					// applying 'force' downward so player doesnt't hang in air
	}
	
	velocity.y -= gravity * Time.deltaTime;					// Apply gravity
	controller.Move ( velocity * Time.deltaTime );			// Move the controller
}

function OnTriggerEnter(other: Collider)
{

	if(other.gameObject.tag == "killbox")
	{
		//Tell scene manager that we got hit by an enemy, removing a life
		sceneManager.transform.GetComponent(scriptSceneManager).LivesUpdate();
	}
}
