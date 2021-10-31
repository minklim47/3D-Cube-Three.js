//variable

let container;
let camera;
let renderer;
let scene;
let cube;

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
    camera.position.set(-3.5,0,10);

    //light
    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,4);
    light.position.set(0,3,5);
    scene.add(light);

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);


    //Load model
    let loader = new THREE.GLTFLoader();
    loader.load('./cube/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        cube = gltf.scene;
        cube.position.y = 0;
        
        animate();
    });

    function moveCamera() {
        //Tell how far the user is from the top 
        const t = document.body.getBoundingClientRect().top;
      
       
        camera.position.y = t * 0.0002;
       // camera.rotation.y = t * -0.0002;
      
      }
      document.body.onscroll = moveCamera;
      moveCamera()
}


function animate(){
    requestAnimationFrame(animate);
    
    cube.rotation.y += 0.01;
    //cube.rotation.z += 0.001;

    renderer.render(scene,camera);
}

init()

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);

