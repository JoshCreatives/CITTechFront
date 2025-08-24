import { MapPin, Phone, HelpCircle, Facebook, Youtube, Instagram, Twitter } from 'lucide-react';

type LinkItem = {
  text: string;
  url: string;
};

type ContentItem = {
  icon?: JSX.Element;
  text: string;
  link?: LinkItem;
};

type Section = {
  title: string;
  content?: ContentItem[];
  links?: LinkItem[];
  socialLinks?: (LinkItem & { icon: JSX.Element })[];
};

const sections: Section[] = [
  {
    title: "CIT TechFront Department",
    content: [
      {
        icon: <MapPin className="h-5 w-5" />,
        text: "Location: Brgy. 12, Dapa"
      },
      {
        icon: <Phone className="h-5 w-5" />,
        text: "Phone: +63 2 88121784"
      },
      {
        icon: <HelpCircle className="h-5 w-5" />,
        text: "SIIT Helpdesk:",
        link: {
          text: "Click here",
          url: "#"
        }
      }
    ]
  },
  {
    title: "Quick Links",
    links: [
      { text: "CIT Life", url: "/careers" },
      { text: "Research", url: "/disclosures" },
      { text: "IT support", url: "/admissions/payment" }
    ]
  },
  {
    title: "Resources",
    links: [ // <-- Change from content to links
      { text: "Career Services", url: "/scope" },
      { text: "Alumni network", url: "/career-camp" },
      { text: "Library", url: "/campuses" },
      { text: "Arduino's", url: "/i-cares" }
    ]
  }, 
  {
    title: "Other Links",
    socialLinks: [
      { icon: <Facebook className="h-5 w-5" />, text: "Facebook", url: "https://web.facebook.com/siit.edu.ph" },
      { icon: <Youtube className="h-5 w-5" />, text: "YouTube", url: "https://youtu.be/IOfOVloMEfs?si=d6IJpN_Hx93ckbcD" },
      { icon: <Instagram className="h-5 w-5" />, text: "Instagram", url: "https://instagram.com" },
      { icon: <Twitter className="h-5 w-5" />, text: "Twitter", url: "https://twitter.com" }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-6">{section.title}</h3>

              {/* SIIT College & Regular Updates Sections */}
              {section.content && (
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      {item.icon && item.icon}
                      <p className="text-gray-300">
                        {item.text}
                        {item.link && (
                          <a href={item.link.url} className="text-yellow-400 hover:text-yellow-300 ml-1">
                            {item.link.text}
                          </a>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Navigation Links */}
              {section.links && (
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} className="text-white hover:text-red-600 transition-colors">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* Social Links */}
              {section.socialLinks && (
                <div>
                  <ul className="space-y-3 mb-6">
                    {section.socialLinks.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white hover:text-red-600 transition-colors"
                        >
                          {link.icon}
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 text-gray-400"></div>
      </div>
    </footer>
  );
};

export default Footer;
