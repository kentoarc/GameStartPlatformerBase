#pragma strict
//Inspector variable
var waitTime : float = 10.0;
var customSkin	:GUISkin;


function Update()
{
	if(Input.GetKeyDown(KeyCode.Escape))
	{
		Application.LoadLevel("mainMenu"); //Start game
	}
	else
	{
		WaitTime();
	}
}


function OnGUI()
{
	GUI.skin = customSkin;
	
	//Make a group on the center of the screen
	GUI.BeginGroup(Rect(Screen.width / 2-200, Screen.height / 2-50, 500,300));
	
	//Make a box to see the group on screen
	GUI.Box(Rect(0,0,400,175), "Instructions");
	
	//instructions for the player
	GUI.Label(Rect(10,30,250,40), "W, A, S, D Keys to move");
	GUI.Label(Rect(10,60,250,70), "E Key to Shoot");
	GUI.Label(Rect(10,90,270,100), "Escape to Quit to menu");
	
	//End the group we started from above
	GUI.EndGroup();
}

function WaitTime()
{
	yield WaitForSeconds(waitTime);
	Application.LoadLevel("mainMenu");
}