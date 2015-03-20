//Main Menu script
#pragma strict

var customSkin : GUISkin;																	//Loads up the custom skin for the GUI

function OnGUI()
{
	GUI.skin = customSkin;
	
	//Make a group on the center of the screen
	GUI.BeginGroup(Rect(Screen.width / 2-100, Screen.height / 2-50, 250,300));
	
	//Make a box to see the group on screen
	GUI.Box(Rect(0,0,200,175), "Main Menu");
	
	//Add buttons for game navigation
	if (GUI.Button(Rect(20,30,160,30), "Level Select"))
	{
		Application.LoadLevel("levelSelect_1");
	}
	
	//Add buttons for game navigation
	if (GUI.Button(Rect(20,65,160,30), "Controls"))
	{
		Application.LoadLevel("loadScreen");
	}
	
	//Add buttons for game navigation
	if(GUI.Button(Rect(20,100,160,30), "Website"))
	{
		Application.OpenURL("http://gamestartschool.org");
	}
	
	//Add buttons for game navigation
	if(GUI.Button(Rect(20,135,160,30), "Exit"))
	{
		Application.Quit();
	}
	
	
	//Ends the GUI Group
	GUI.EndGroup();
}