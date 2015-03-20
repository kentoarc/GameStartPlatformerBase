#pragma strict
var sceneManager	:GameObject;



function Start () {

}

function Update () {

}

function OnTriggerEnter (other: Collider)
{
	if(other.gameObject.tag == "Player")
	{
		sceneManager.transform.GetComponent(scriptSceneManager).ScoreUpdate();
		
		Destroy(gameObject);
	}
}