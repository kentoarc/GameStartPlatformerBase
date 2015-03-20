using UnityEngine;
using System.Collections;

public class Killer : MonoBehaviour {

	void OnTriggerEnter(Collider c) {
		c.gameObject.SendMessage ("Die", this, SendMessageOptions.DontRequireReceiver);
	}

	void OnCollisionEnter(Collision c){
		c.gameObject.SendMessage ("Die", this, SendMessageOptions.DontRequireReceiver);
	}
}
