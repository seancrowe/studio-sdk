import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import { mockFrameAnimation } from '../__mocks__/animations';
import { FrameAnimationType } from '../../../types/AnimationTypes';
import mockChild from '../__mocks__/FrameProperties';
import { FrameController } from '../../controllers/FrameController';
import { AnimationController } from '../../controllers/AnimationController';

let mockedSDK: SDK;
let mockedAnimation: FrameAnimationType;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedAnimation = mockFrameAnimation;
    mockedSDK.children = mockChild;
    mockedSDK.frame = new FrameController(mockChild);
    mockedSDK.frame.getFramePropertyCalculatedValue = jest.fn().mockResolvedValue(true);
    mockedSDK.animation = new AnimationController(mockChild);
    jest.spyOn(mockedSDK.animation, 'playAnimation');
    jest.spyOn(mockedSDK.animation, 'pauseAnimation');
    jest.spyOn(mockedSDK.animation, 'setFrameAnimation');
    jest.spyOn(mockedSDK.animation, 'setScrubberPosition');
    jest.spyOn(mockedSDK.animation, 'setAnimationDuration');
    jest.spyOn(mockedSDK.animation, 'resetFrameAnimation');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Animation methods', () => {
    it('Should call  all of the animation functions of child successfully', async () => {
        await mockedSDK.animation.setFrameAnimation(mockedAnimation.animation);
        expect(mockedSDK.children.setFrameAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.playAnimation();
        expect(mockedSDK.children.playAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.pauseAnimation();
        expect(mockedSDK.children.pauseAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.setScrubberPosition(5000);
        expect(mockedSDK.animation.setScrubberPosition).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setScrubberPosition).toHaveBeenLastCalledWith(5000);

        await mockedSDK.animation.setAnimationDuration(8000);
        expect(mockedSDK.animation.setAnimationDuration).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setAnimationDuration).toHaveBeenLastCalledWith(8000);

        await mockedSDK.animation.resetFrameAnimation(mockFrameAnimation.animation.frameId);
        expect(mockedSDK.children.resetFrameAnimation).toHaveBeenCalledTimes(1);
    });
});
