using UnityEngine;
using System.Collections;

public class Goal : MonoBehaviour {

	public string triggerMessage = "You Win! :D";

	void OnTriggerEnter(Collider c) {
		if (c.GetComponent<HeroCharacter> ()) {
			FindObjectOfType<GUIText>().text = triggerMessage;
		}
	}
}
