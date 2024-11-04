import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const AnimatedCodingPhrases = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Create the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Set up camera position
        camera.position.z = 5;

        // Add lighting for better visualization
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Load the font for the text
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const phrases = [
                "console.log('Hello, World!')",
                "404: Brain not found",
                "Code > Sleep",
                "Did you try turning it off and on?",
                "Bug-free, I swear!",
                "Works on my machine!"
            ];
            const textMeshes = [];

            phrases.forEach((phrase, index) => {
                const textGeometry = new TextGeometry(phrase, {
                    font: font,
                    size: 0.5,
                    depth: 0.1
                });
                const textMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);

                // Center the text by calculating the bounding box
                textGeometry.computeBoundingBox();
                const boundingBox = textGeometry.boundingBox;
                const centerX = (boundingBox.max.x - boundingBox.min.x) / 2;
                const centerY = (boundingBox.max.y - boundingBox.min.y) / 2;
                textMesh.position.set(-centerX, -centerY - index * 1.5, -10); // Adjust y-position for spacing

                textMeshes.push(textMesh);
                scene.add(textMesh);
            });

            // Animation for moving phrases into view one by one
            let currentIndex = 0;
            const animatePhrases = () => {
                if (currentIndex < textMeshes.length) {
                    const mesh = textMeshes[currentIndex];
                    const targetZ = 0;

                    const animateIn = () => {
                        if (mesh.position.z < targetZ) {
                            mesh.position.z += 0.1; // Adjust speed as needed
                            requestAnimationFrame(animateIn);
                        } else {
                            currentIndex++;
                            setTimeout(animatePhrases, 1000); // Delay before animating the next phrase
                        }
                        renderer.render(scene, camera);
                    };
                    animateIn();
                }
            };

            animatePhrases();
        });

        // Adjust canvas size on window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Cleanup on component unmount
        return () => {
            renderer.dispose();
            window.removeEventListener('resize', () => {});
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} style={{ width: '100%', height: '100vh', background: 'radial-gradient(circle, #2b2b2b, #1b1b1b)' }} />;
};

export default AnimatedCodingPhrases;
