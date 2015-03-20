//Laser script
#pragma strict

//Inspector variables
var laserSpeed 		: float = 1.0;													//Speed of the laser
var hightLimit 		: float = 10;													//range the laser can trave
var dir				: int = 1;
//Private variables

private var timer = 0;

//Game Loop
function Update () 
{
	if(dir == 1)
	{
		transform.Translate(laserSpeed * Time.deltaTime,0,0);
	}					//move object in the y direction
	
	if(dir == 0)
	{
		transform.Translate(laserSpeed * (0 - Time.deltaTime), 0, 0);
	}
	
	timer = timer + 1;
	
	if(timer == 200)
	{
		Destroy(gameObject);
	}
	
	
	//check if object is off screen
	//if(transform.position.x >= hightLimit || transform.position.x <= (0 - hightLimit))
	//{
	//	Destroy (gameObject);														//remove the object from the scene
	//}	
}

function OnTriggerEnter(other: Collider)
{
	
	if(other.gameObject.tag != "Player")
	{	
		//Get rid of the bullet
		Destroy (gameObject);	
		Debug.Log("NOPE");
		Debug.Log(other);													//remove the object from the scene
	}
}