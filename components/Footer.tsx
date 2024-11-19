export function Footer() {
    return (
        <footer className="bg-auto relative z-0 -mt-20 pt-32 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-bold mb-4">About Us</h4>
                        <p>Building a Better Future, Together</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#team">Team</a></li>
                            <li><a href="#mission">Mission</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            INSTAGRAM
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8 pt-8 border-t">
                    <p>&copy; 2024 Smart Web Solution Corp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
//fixed bottom-0