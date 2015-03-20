using UnityEngine;
using System.Collections;

public class HeroCharacter : MonoBehaviour {
	public Transform bulletPrefab;
	public float bulletSpeed = 1f;
	public float bulletLifeTime = 3f;
	public string dieMessage = "You died :(";

	void Update() {
		if (Input.GetButtonDown ("Fire1")) {
			Vector3 bulletSpawnLoc = transform.position + transform.forward*0.5f + transform.up*0.2f;
			Transform bullet = Instantiate(bulletPrefab, bulletSpawnLoc, transform.rotation) as Transform;
			bullet.rigidbody.velocity = transform.forward * bulletSpeed * 0.1f;
			Destroy (bullet.gameObject, bulletLifeTime);
		}
	}

	void Die() {
		FindObjectOfType<GUIText>().text = dieMessage;
		Invoke ("ReloadLevel", 3);
	}

	void ReloadLevel() {
		Application.LoadLevel (Application.loadedLevel);
	}
}
