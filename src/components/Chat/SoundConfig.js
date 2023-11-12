import chat_hidden from './chat-assets/Songs/chat_hidden.mp3';
import first_message from './chat-assets/Songs/first_message.mp3';
import good_morning from './chat-assets/Songs/good-morning.mp3';
import message_send from './chat-assets/Songs/message_send.mp3';
import messageSound from './chat-assets/Songs/messageSound.mp3';
import Nice_Msg_Tone from './chat-assets/Songs/Nice_Msg_Tone.mp3';
import Changer from './chat-assets/Songs/changer.mp3';
import VideoLlamada from './chat-assets/Songs/llamada_audio.mp3';
import VideoLlamadaRemoto from './chat-assets/Songs/llamada_video_remoto.mp3';
import colgada from './chat-assets/Songs/disconnected.mp3';

const chat_hidden_audio = new Audio(chat_hidden);
const first_message_audio = new Audio(first_message);
const good_morning_audio = new Audio(good_morning);
const message_send_audio = new Audio(message_send);
const messageSound_audio = new Audio(messageSound);
const Nice_Msg_Tone_audio = new Audio(Nice_Msg_Tone);
const Changer_audio = new Audio(Changer);
const video_llamada = new Audio(VideoLlamada);
const video_llamada_remoto = new Audio(VideoLlamadaRemoto);
const Colgada = new Audio(colgada);

export default {
  chat_hidden_audio,
  first_message_audio,
  good_morning_audio,
  message_send_audio,
  messageSound_audio,
  Nice_Msg_Tone_audio,
  Changer_audio,
  video_llamada,
  video_llamada_remoto,
  Colgada
};
