import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  chat: any; // The chat object from the dashboard
  userId: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ open, onClose, chat, userId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && chat) {
      fetchMessages();
      // Real-time subscription
      const channel = supabase.channel('chat-messages')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'chats',
          filter: `listing_id=eq.${chat.listing_id}`
        }, (payload) => {
          fetchMessages();
        })
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    }
    // eslint-disable-next-line
  }, [open, chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('chats')
      .select('*')
      .eq('listing_id', chat.listing_id)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
    setLoading(false);
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('chats').insert({
      sender_id: userId,
      receiver_id: chat.sender_id === userId ? chat.receiver_id : chat.sender_id,
      listing_id: chat.listing_id,
      message: newMessage.trim(),
    });
    setNewMessage('');
    setLoading(false);
    if (!error) fetchMessages();
  };

  if (!open || !chat) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-2">Conversation</h2>
        <div className="mb-4 text-sm text-gray-500">Listing: {chat.listings?.title || 'Vehicle'}</div>
        <div className="h-64 overflow-y-auto border rounded p-2 bg-gray-50 mb-4">
          {messages.length === 0 && <div className="text-center text-gray-400">No messages yet.</div>}
          {messages.map((msg, idx) => (
            <div key={msg.id} className={`mb-2 flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`} >
              <div className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.sender_id === userId ? 'bg-blue-100 text-right' : 'bg-gray-200'}`}>
                <div className="text-xs text-gray-500 mb-1">{msg.sender_id === userId ? 'You' : 'Them'}</div>
                <div>{msg.message}</div>
                <div className="text-[10px] text-gray-400 mt-1">{new Date(msg.created_at).toLocaleString()}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !newMessage.trim()}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
