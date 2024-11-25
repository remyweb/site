'use client';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type CaptchaSize = 'compact' | 'normal' | 'invisible';

export function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [captchaSize, setCaptchaSize] = useState<CaptchaSize>('normal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const updateCaptchaSize = () => {
      if (window.innerWidth < 768) {
        setCaptchaSize('compact');
      } else {
        setCaptchaSize('normal');
      }
    };

    updateCaptchaSize();
    window.addEventListener('resize', updateCaptchaSize);

    return () => {
      window.removeEventListener('resize', updateCaptchaSize);
    };
  }, []);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!captchaValue) {
      alert('Please complete the CAPTCHA');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captcha: captchaValue,
        }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        });
        setCaptchaValue(null);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-auto py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="text-gray-50">Contact Us</span>
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Daniels"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#90CA03]/50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  placeholder="Jack"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#90CA03]/50 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-400 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="e.g. thomas@sws-corp.tech"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#90CA03]/50 transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-8 relative">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-400 mb-2"
            >
              Message
            </label>
            <div className="relative">
              <textarea
                id="message"
                rows={5}
                placeholder="Enter your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#90CA03]/30 transition-all duration-300 resize-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <ReCAPTCHA
              sitekey="6Lf6rYMqAAAAANg4Nb2iB3lH03IHO6RrnZVF6LCJ"
              onChange={handleCaptchaChange}
              size={captchaSize}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full md:w-auto md:min-w-[200px] flex items-center justify-center gap-2 px-8 py-3 bg-zinc-900 rounded-xl font-medium text-white relative overflow-hidden ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting || !captchaValue}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#90CA03] to-[#7AB002] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative cursor-pointer">Send Message</span>
            <Send className="w-4 h-4 relative" />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}