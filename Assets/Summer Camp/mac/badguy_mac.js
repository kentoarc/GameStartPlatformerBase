
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
		transform.position = new Vector2(originalX+ Mathf.Cos(Time.time*directionalSpeed)*distance, originalY);
	}
	if( upDown == true)
	{
		transform.position = new Vector2(originalX, originalY + Mathf.Cos(Time.time*directionalSpeed)*distance);
	}
}

function OnTriggerEnter(other: Collider)
{
	if(other.gameObject.tag == "Player" && alive)
	{
		sceneManager.transform.GetComponent(scriptSceneManager).LivesUpdate();
	}
	
	if(other.gameObject.tag == "laser")
	{
		alive = false;
		enabled = false;
		SendMessage ("Die");
		Destroy(gameObject);
	}
}

