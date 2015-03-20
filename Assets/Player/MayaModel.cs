using UnityEngine;
using System.Collections;

public class MayaModel : MonoBehaviour {

	public Transform modelPrefab;
	public Vector3 modelPosition;
	public float modelScale = 20;
	public Vector3 modelRotation;
	public static Light myLight;
	public Transform model;
	// Use this for initialization
	void Start () {
		if (!modelPrefab){
			enabled = false;
			return;
		}
		GetComponent<SpriteRenderer> ().enabled = false;
		model = GameObject.Instantiate (modelPrefab) as Transform;
		model.parent = transform;
		model.localPosition = modelPosition;
		model.localScale = Vector3.one * modelScale;
		model.localRotation = Quaternion.Euler( modelRotation);
		SetLayerRecursively (model.gameObject, "ortho");

		if (!myLight) {
			Light light = new GameObject ().AddComponent<Light> ();
			light.type = LightType.Directional;
			light.transform.eulerAngles = new Vector3 (45, 45, 45);
			model.animation.Play ("walk");
			model.animation.wrapMode = WrapMode.Loop;
			myLight = light;
		}
	}

	public static void SetLayerRecursively(GameObject go, string layerName)
	{
		foreach (Transform trans in go.GetComponentsInChildren<Transform>(true))
		{
			trans.gameObject.layer = LayerMask.NameToLayer (layerName);
		}
	}

	public void Die(){
		model.parent = new GameObject("Killed").transform;
		model.parent.position = transform.position;
		model.parent.localScale = transform.localScale;
		model.animation.Play ("die");
		model.animation.wrapMode = WrapMode.Once;
	}
}
