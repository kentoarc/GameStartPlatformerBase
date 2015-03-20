using UnityEngine;
using System.Collections;

public class CanDie : MonoBehaviour {
	void Die() {
		Animation anim = GetComponentInChildren<Animation> ();
		if (anim) {
			anim.Play ("die");
			foreach (Behaviour c in gameObject.GetComponents<Behaviour>()) {
				c.enabled = false;
			}
			foreach (Collider c in gameObject.GetComponents<Collider>()) {
				c.enabled = false;
			}
		} else {
			Destroy(gameObject);
		}
	}
}
