//level select script
#pragma strict

var customSkin : GUISkin;																	//Loads up the custom skin for the GUI

function OnGUI()
{
	GUI.skin = customSkin;
	
	//Make a group on the center of the screen
	GUI.BeginGroup(Rect(Screen.width / 2-100, Screen.height / 2-50, 250,300));
	
	//Make a box to see the group on screen
	GUI.Box(Rect(0,0,200,175), "Level Select");
	
	//Add buttons for game navigation
	if (GUI.Button(Rect(20,30,160,30), "Mason"))
	{
		Application.LoadLevel("mason_level_01");
	}
	

	
	//Add buttons for game navigation
	if(GUI.Button(Rect(20,100,160,30), "More Levels"))
	{
		Application.LoadLevel("levelSelect_1");
	}
	
	//Add buttons for game navigation
	if(GUI.Button(Rect(20,135,160,30), "Main Menu"))
	{
		Application.LoadLevel("mainMenu");
	}
	
	
	//Ends the GUI Group
	GUI.EndGroup();
}