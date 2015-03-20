//win screen
#pragma strict

//inspector variables
var customSkin : GUISkin;


function OnGUI()
{
	GUI.skin = customSkin;
	
	//Make a group on the center of the screen
	GUI.BeginGroup(Rect(Screen.width / 2-200, Screen.height / 2-50, 500,300));
	
	//Make a box to see the group on screen
	GUI.Box(Rect(0,0,400,175), "You Win"); //or use the designer input
	
	//what was the score
	GUI.Label(Rect(75,40,250,40), "Score: " + PlayerPrefs.GetInt("SCORE"));

	
	//Add buttons here
	if(GUI.Button(Rect(25,175,120,30), "Main Menu"))
	{
		Application.LoadLevel("MainMenu");	//takes us back to the main menu
	}
	
	//End the group we started from above
	GUI.EndGroup();
}
