using UnityEngine;
using System.Collections;

public class EnemyMovement : MonoBehaviour {

	public Vector3[] waypoints;
	public float speed = 1f;
	CharacterController _controller;

	public float turnSpeed = 0.6f;
	public float distToWaypoint;
	public int waypointIndex = 0;
	public bool debug = false;
	
	void FixedUpdate() {
		Vector3 dir = waypoints [waypointIndex] - transform.position;
		distToWaypoint = dir.magnitude;

		if (debug) {
			Debug.DrawLine (transform.position, transform.position + dir);
		}

		transform.rotation = Quaternion.Lerp(transform.rotation, Quaternion.LookRotation(dir), turnSpeed);
		transform.Translate(dir.normalized * speed * Time.fixedDeltaTime, Space.World);

		if (distToWaypoint < 0.5f) {
			waypointIndex = (waypointIndex +1)%waypoints.Length;
		}
	}
}
