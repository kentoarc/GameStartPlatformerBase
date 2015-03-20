
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
	if(other.gameObject.tag == "Player")
	{
		sceneManager.transform.GetComponent(scriptSceneManager).LivesUpdate();
	}
	
	if(other.gameObject.tag == "laser")
	{
		Destroy(gameObject);
	}
}

