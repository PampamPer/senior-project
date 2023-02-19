import NavBar from './NavBar';
import Timeline from './Timeline'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

export default function MainStudent() {
    return (
        <div>
            <NavBar/>
            {/* <Parallax pages={2} style={{ top: '0', left: '0' }} class="animation">
                <ParallaxLayer offset={0} speed={2.5}>
                    <div></div>
                </ParallaxLayer>
            </Parallax> */}
        </div>
    );
}