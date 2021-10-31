//variable

let container;
let camera;
let renderer;
let scene;
let tree;

function init(){
    //select container from index.html
    container = document.querySelector('.scene')

    //create scene
    scene = new THREE.Scene();

    //camera setup
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000; //(meters) if further than this, we cannot see

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
    camera.position.set(0,500,500);

    //light
    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,5);
    light.position.set(10,10,10);
    scene.add(light);

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);


    //Load model
    let loader = new THREE.GLTFLoader();
    loader.load('./tree/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        tree = gltf.scene.children[0];
        animate();
    });
}

function animate(){
    requestAnimationFrame(animate);
    tree.rotation.z += 0.005;
    renderer.render(scene,camera);
}

init()

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
