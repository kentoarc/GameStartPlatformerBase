using UnityEngine;
using System.Collections;

public class AdjustWalkSpeed : MonoBehaviour {

	public float animSpeed = 4f;

	void FixedUpdate () {

		float speed = Mathf.Abs (Input.GetAxis ("Horizontal")) * animSpeed;
		if (Input.GetButton ("Fire1")) {
			speed *= 2;
		}
		animation ["walk"].speed = speed;
	}
}
