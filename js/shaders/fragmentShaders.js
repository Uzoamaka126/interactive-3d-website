const simpleFrag = `
uniform vec3 colorA;
uniform vec3 colorB;

varying vec2 vUv;

    void main() {
        gl_FragColor = vec4(uv, 1, 1.0)
    }
`