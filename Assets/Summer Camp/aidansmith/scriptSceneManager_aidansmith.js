// Inspector Variables
var gameTime			: float			= 60;
var numIcon				: Texture2D[]	= new Texture2D[10];
var lifeIcon			: Texture2D[]	= new Texture2D[5];
var playerScript		: GameObject;							// loads up player script
var customSkin			: GUISkin;								// loads up the custom GUI
var curSavePos			: Vector3;

static var score		: int	= 0;
var lives 		: int	= 3;

// Game Loop
function Start () 
{
	InvokeRepeating("Countdown",1.0,1.0);
}

function Update () 
{
	
}

function ScoreUpdate()
{
	score += 1;
}

function LivesUpdate()
{
	//Debug.Log("got there!");
	lives -= 1;
}

function Countdown()
{
	if(--gameTime == 0)
	{
		CancelInvoke("Countdown");
	}
}

function OnGUI()
{
	GUI.skin 			= customSkin;						// Applies the custom GUI skin
	GUI.backgroundColor	= Color.clear;						// MAkes the GUI background Clear
	
	// creates the GUI for the score
	GUI.Box (Rect (0,0,50,50), numIcon[(score/10000) % numIcon.length]); 			//loops the sprites from 0-9, uses mod
	GUI.Box (Rect (20,0,50,50), numIcon[(score/1000) % numIcon.length]);		
	GUI.Box (Rect (40,0,50,50), numIcon[(score/100) % numIcon.length]);
	GUI.Box (Rect (60,0,50,50), numIcon[(score/10) % numIcon.length]);
	GUI.Box (Rect (80,0,50,50), numIcon[score % numIcon.length]);
	
	//creates the GUI for lives
	if(lives == 5)																	//If lives == 5, show correct number of sprites
	{
		GUI.Box (Rect (0,25,50,50), lifeIcon[0]);
		GUI.Box (Rect (40,25,50,50), lifeIcon[1]);
		GUI.Box (Rect (80,25,50,50), lifeIcon[2]);
		GUI.Box (Rect (120,25,50,50), lifeIcon[3]);
		GUI.Box (Rect (160,25,50,50), lifeIcon[4]);
	}
	if(lives == 4)																	//If lives == 4, show correct number of sprites
	{
		GUI.Box (Rect (0,25,50,50), lifeIcon[0]);
		GUI.Box (Rect (40,25,50,50), lifeIcon[1]);
		GUI.Box (Rect (80,25,50,50), lifeIcon[2]);
		GUI.Box (Rect (120,25,50,50), lifeIcon[3]);

	}
	if(lives == 3)																	//If lives == 3, show correct number of sprites
	{
		GUI.Box (Rect (0,25,50,50), lifeIcon[0]);
		GUI.Box (Rect (40,25,50,50), lifeIcon[1]);
		GUI.Box (Rect (80,25,50,50), lifeIcon[2]);

	}
	if(lives == 2)																	//If lives == 2, show correct number of sprites
	{
		GUI.Box (Rect (0,25,50,50), lifeIcon[0]);
		GUI.Box (Rect (40,25,50,50), lifeIcon[1]);

	}
	if(lives == 1)																	//If lives == 1, show correct number of sprites
	{
		GUI.Box (Rect (0,25,50,50), lifeIcon[0]);

	}
	if(lives == 0)																	//If lives == , show GameOver screen
	{
		
	}
	
	//creates GUI for Timer
	GUI.Label (Rect (Screen.width - 100,10,100,20), "Timer: " + gameTime);
	
	
	
}