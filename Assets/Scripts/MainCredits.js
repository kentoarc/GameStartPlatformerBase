//Credit Script
#pragma strict

//inspector variable
var customSkin : GUISkin;


function OnGUI()
{
	GUI.skin = customSkin;
	
	//Make a group on the center of the screen
	GUI.BeginGroup(Rect(Screen.width / 2-200, Screen.height / 2-50, 500,300));
	
	//Make a box to see the group on screen
	GUI.Box(Rect(0,0,400,175), "Credits");
	
	//credits for all who helped make the game
	GUI.Label(Rect(75,40,250,40), "Designer		");
	GUI.Label(Rect(75,70,250,70), "Artist				");
	GUI.Label(Rect(75,100,270,100), "Software		");
	
	//Add button here
	if(GUI.Button(Rect(150,175,80,30), "Back"))
	{
		Application.LoadLevel("MainMenu");	//takes us back to the main menu
	}
	
	//End the group we started from above
	GUI.EndGroup();
}
