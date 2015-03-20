
private var useSpeed		: float;
private var originalX		: float;
private var originalY		: float;


var leftRight				: boolean	= false;
var upDown					: boolean	= false;
var waveMove				: boolean	= false;

var amplitudeX 				: float 	= 10.0f;
var amplitudeY 				: float		= 5.0f;
var omegaX 					: float 	= 1.0f;
var omegaY 					: float 	= 5.0f;
var index 					: float;
var directionalSpeed		: float		= 9.0f;
var distance				: float		= 10.0f;

var sceneManager			: GameObject;
var alive					: boolean	= false;
function Start()
{
	originalX = transform.position.x;
	originalY = transform.position.y;
	useSpeed = -directionalSpeed;
}


function Update()
{
	if( leftRight == true)
	{
		upDown = false;
		waveMove = false;
		
		if( originalX - transform.position.x > distance)
			useSpeed = directionalSpeed;
		else if( originalX - transform.position.x < -distance)
			useSpeed = -directionalSpeed;
		
		transform.Translate(useSpeed*Time.deltaTime,0,0);
	}
	
	if( upDown == true)
	{
		leftRight = false;
		waveMove = false;
		
		if( originalY - transform.position.y > distance)
			useSpeed = directionalSpeed;
		else if( originalY - transform.position.y < -distance)
			useSpeed = -directionalSpeed;
		
		transform.Translate(0,useSpeed*Time.deltaTime,0);
	}
	
	if( waveMove == true)
	{
		leftRight = false;
		upDown = false;
	
		index += Time.deltaTime;
    	var x = amplitudeX*Mathf.Cos (omegaX*index);
   		var y = Mathf.Abs (amplitudeY*Mathf.Sin (omegaY*index));
    	transform.localPosition= new Vector3(x,y,0);
	}
	
}

function OnTriggerEnter(other: Collider)
{
	if(other.gameObject.tag == "Player"/* && alive*/)
	{
		var playerX;
		var playerY;
		var thisX;
		var thisY;
		var xDif;
		var yDif;
		if(other.gameObject.transform.position.x < 0)
		{
			playerX = 0 - other.gameObject.transform.position.x;
		}
		else
		{
			playerX = other.gameObject.transform.position.x;
		}
		
		if(gameObject.transform.position.x < 0)
		{
			thisX = 0 - gameObject.transform.position.x;
		}
		else
		{
			thisX = gameObject.transform.position.x;
		}
		
		if(other.gameObject.transform.position.y < 0)
		{
			playerY = 0 - other.gameObject.transform.position.y;
		}
		else
		{
			playerY = other.gameObject.transform.position.y;
		}
		
		if(gameObject.transform.position.y < 0)
		{
			thisY = 0 - gameObject.transform.position.y;
		}
		else
		{
			thisY = gameObject.transform.position.y;
		}
		
		if(thisX - playerX < 0)
		{
			xDif = 0 - (thisX - playerX);
		}
		else
		{
			xDif = thisX - playerX;
		}
		
		if(thisY - playerY < 0)
		{
			yDif = 0 - (thisY - playerY);
		}
		else
		{
			yDif = thisY - playerY;
		}
		
		if(xDif > yDif)
		{
			//Debug.Log("HI");
			//Debug.Log(sceneManager.transform.GetComponent(scriptSceneManager));
			sceneManager.transform.GetComponent(scriptSceneManager).LivesUpdate();
			other.transform.position = sceneManager.transform.GetComponent(scriptSceneManager).curSavePos;
		}
		else
		{
			alive = false;
			enabled = false;
			SendMessage ("Die");
			Destroy(gameObject);
		}
	}
	
	if(other.gameObject.tag == "laser")
	{
		alive = false;
		enabled = false;
		SendMessage ("Die");
		Destroy(gameObject);
	}
}

