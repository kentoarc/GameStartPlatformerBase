// Spawn Save Player Location Setup
// GameStart
// Description: Saves Player Position / Location (save points) for spawning after death (kill box)
// Instructions: Place save points (gameObjects with collioson) in the scene with tag names ' savePoint'
// 				 place killboxes in scene with tag name 'killbox' - currently sends player to most recent save point location

var startPoint			: Transform;				// where the player is going to start the game (optional)
var soundDie			: AudioClip;
var sceneManager		: GameObject;			// sound for death
private var soundRate	: float			= 0.0;		// varible holds current time + delay amount
private var soundDelay	: float			= 0.0;		// amount of time to delay before playing sound again
private var curSavePos	: Vector3;					// current save position of player


function PlaySound (soundName, soundDelay )
{
	//No sound
	return;
	if ( !audio.isPlaying && Time.time > soundRate )
	{
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
		yield WaitForSeconds (audio.clip.length);
	}	
}

function OnTriggerEnter (other	: Collider )		// check for even
{
	if ( other.tag == "savePoint" )					// if savePoint tagged on anything
	{
		curSavePos = transform.position;
		sceneManager.transform.GetComponent(scriptSceneManager).curSavePos = curSavePos;			// players current position is stored in curSavePos
	}
	
	if ( other.tag == "killbox" /*&& other.ShouldKill() == true*/)					// if killbox is tagged on anything
	{
		PlaySound ( soundDie, 0 );					// play audio clip for soundDie
		transform.position = curSavePos;			// then make player position equal to las curSavePos
	}
}

function RespawnPlayer()
{
	transform.position = curSavePos;
}

function Start ()									// one time intialization
{
	if ( startPoint != null )						// quick check - if start point exists
	{
		transform.position = startPoint.position;	// then make the player position equal to startPoint position in game
	}
}