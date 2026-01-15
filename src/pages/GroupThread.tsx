import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Heart, MessageCircle, Plus } from 'lucide-react';

export default function GroupThread() {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      author: 'Marie L.',
      isMentor: true,
      time: 'Il y a 2h',
      content: 'Bonjour à toutes ! Je viens de terminer mon bootcamp et je cherche des conseils pour préparer mes premiers entretiens techniques. Quelqu\'un aurait des ressources à partager ?',
      likes: 12,
      replies: 5,
    },
    {
      id: 2,
      author: 'Sophie D.',
      isMentor: false,
      time: 'Il y a 5h',
      content: 'Je galère avec React Hooks... Est-ce que quelqu\'un pourrait m\'expliquer la différence entre useState et useEffect ?',
      likes: 8,
      replies: 3,
    },
    {
      id: 3,
      author: 'Claire M.',
      isMentor: true,
      time: 'Il y a 1 jour',
      content: 'Tips du jour : N\'ayez pas peur de poser des questions en entretien ! Ça montre votre curiosité et votre capacité à apprendre. Les recruteurs apprécient ça 💜',
      likes: 24,
      replies: 7,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <Button
            variant="ghost"
            onClick={() => navigate('/community')}
            className="text-white hover:bg-white/20 mb-4 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-white mb-2">
            Reconversion Dev Web
          </h1>
          <p className="text-purple-100">
            234 membres • 12 discussions actives
          </p>
        </div>

        <div className="p-6 space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-5 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-linear-to-br from-purple-400 to-pink-400 text-white font-semibold">
                      {post.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {post.author}
                      </span>
                      {post.isMentor && (
                        <Badge className="bg-linear-to-r from-purple-600 to-pink-500 text-white hover:from-purple-600 hover:to-pink-500 text-xs">
                          Mentor
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-1.5 text-gray-600 hover:text-purple-600 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-600 hover:text-purple-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.replies}</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Floating Action Button */}
        <Button
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-2xl z-40"
          onClick={() => {}}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}