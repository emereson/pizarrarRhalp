//videoconferencia...
import video_llamada from 'assets/sounds/video-llamada/llamada video.mp3';
import video_llamada_remoto from 'assets/sounds/video-llamada/onBlackboard.mp3';
import video_llamada_exit from 'assets/sounds/video-llamada/disconnected.mp3';
import onblackboard from 'assets/sounds/video-llamada/onBlackboard.mp3';

//voice-call...
import voice_local from 'assets/sounds/voice-call/llamada_audio2.mp3';
import voice_remote from 'assets/sounds/voice-call/sunny_sms.mp3';
import new_user_connected from 'assets/sounds/voice-call/newuser.mp3';

const VideoLlamada = new Audio(video_llamada);
const VideoLlamadaRemoto = new Audio(video_llamada_remoto);
const VideoLlamadaExit = new Audio(video_llamada_exit);
const VoiceCallLocal = new Audio(voice_local);
const VoiceCallRemote = new Audio(voice_remote);
const VoiceCallUserConnected = new Audio(new_user_connected);
const VoiceOnBlackboard = new Audio(onblackboard);

export default {
  VideoLlamada,
  VideoLlamadaRemoto,
  VideoLlamadaExit,
  VoiceCallLocal,
  VoiceCallRemote,
  VoiceCallUserConnected,
  VoiceOnBlackboard
};
