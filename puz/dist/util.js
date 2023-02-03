import { opposite } from 'chessops';
import { parseFen } from 'chessops/fen';
export const getNow = () => Math.round(performance.now());
export const puzzlePov = (puzzle) => opposite(parseFen(puzzle.fen).unwrap().turn);
export const loadSound = (file, volume, delay) => {
    setTimeout(() => lichess.sound.loadOggOrMp3(file, `${lichess.sound.baseUrl}/${file}`, true), delay || 1000);
    return () => lichess.sound.play(file, volume);
};
export const sound = {
    move: (take) => lichess.sound.play(take ? 'capture' : 'move'),
    good: loadSound('lisp/PuzzleStormGood', 0.9, 1000),
    wrong: loadSound('lisp/Error', 1, 1000),
    end: loadSound('lisp/PuzzleStormEnd', 1, 5000),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsR0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUVsRSxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTFGLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxDQUFDLElBQVksRUFBRSxNQUFlLEVBQUUsS0FBYyxFQUFFLEVBQUU7SUFDekUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQztJQUM1RyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUc7SUFDbkIsSUFBSSxFQUFFLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RFLElBQUksRUFBRSxTQUFTLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztJQUNsRCxLQUFLLEVBQUUsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ3ZDLEdBQUcsRUFBRSxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQztDQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHV6emxlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IG9wcG9zaXRlIH0gZnJvbSAnY2hlc3NvcHMnO1xuaW1wb3J0IHsgcGFyc2VGZW4gfSBmcm9tICdjaGVzc29wcy9mZW4nO1xuXG5leHBvcnQgY29uc3QgZ2V0Tm93ID0gKCk6IG51bWJlciA9PiBNYXRoLnJvdW5kKHBlcmZvcm1hbmNlLm5vdygpKTtcblxuZXhwb3J0IGNvbnN0IHB1enpsZVBvdiA9IChwdXp6bGU6IFB1enpsZSkgPT4gb3Bwb3NpdGUocGFyc2VGZW4ocHV6emxlLmZlbikudW53cmFwKCkudHVybik7XG5cbmV4cG9ydCBjb25zdCBsb2FkU291bmQgPSAoZmlsZTogc3RyaW5nLCB2b2x1bWU/OiBudW1iZXIsIGRlbGF5PzogbnVtYmVyKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4gbGljaGVzcy5zb3VuZC5sb2FkT2dnT3JNcDMoZmlsZSwgYCR7bGljaGVzcy5zb3VuZC5iYXNlVXJsfS8ke2ZpbGV9YCwgdHJ1ZSksIGRlbGF5IHx8IDEwMDApO1xuICByZXR1cm4gKCkgPT4gbGljaGVzcy5zb3VuZC5wbGF5KGZpbGUsIHZvbHVtZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc291bmQgPSB7XG4gIG1vdmU6ICh0YWtlOiBib29sZWFuKSA9PiBsaWNoZXNzLnNvdW5kLnBsYXkodGFrZSA/ICdjYXB0dXJlJyA6ICdtb3ZlJyksXG4gIGdvb2Q6IGxvYWRTb3VuZCgnbGlzcC9QdXp6bGVTdG9ybUdvb2QnLCAwLjksIDEwMDApLFxuICB3cm9uZzogbG9hZFNvdW5kKCdsaXNwL0Vycm9yJywgMSwgMTAwMCksXG4gIGVuZDogbG9hZFNvdW5kKCdsaXNwL1B1enpsZVN0b3JtRW5kJywgMSwgNTAwMCksXG59O1xuIl19