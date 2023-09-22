import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FeaturedPost from "./FeaturedPost";
import MainFeaturedPost from "./MainFeaturedPost";
import { Typography } from "@mui/material";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Blog 1",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://images.unsplash.com/photo-1686135187001-d3bbfdeeef8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    imageLabel: "Image Text",
  },
  {
    title: "Blog 2",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://images.unsplash.com/photo-1678851836066-dc27614cc56b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    imageLabel: "Image Text",
  },
];

const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
        <Typography variant="h3">
          About <b>BlueTech</b>
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          {" "}
          <br />
          Welcome to Bluetech, your ultimate destination for the most
          exhilarating gaming gear and accessories. We're not just another
          online store; we're your dedicated partner in the world of gaming. Our
          mission is simple: to equip gamers of all levels with the tools they
          need to dominate the virtual battlegrounds and elevate their gaming
          experiences.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: 30 }}>
          <br /> Our Gaming Passion
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          At Bluetech, gaming isn't just a hobby; it's a way of life. Our team
          is composed of hardcore gamers who live and breathe the world of
          pixels, controllers, and headsets. We understand the thrill of pulling
          off a perfect headshot, the joy of completing a challenging quest, and
          the camaraderie that online multiplayer games bring. That's why we've
          made it our mission to provide you with the best gaming gear
          available.{" "}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: 30 }}>
          <br />
          Why BlueTech
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          We know you have choices when it comes to your gaming equipment, and
          we're honored you've chosen us. Here's what sets us apart:{" "}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          <b>Curated Selection:</b> We've scoured the gaming universe to bring
          you a handpicked selection of top-tier gaming gear. From
          high-performance gaming PCs and consoles to precision mice, mechanical
          keyboards, and noise-canceling headsets, we've got it all.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          <b>Quality Assurance:</b> We understand that gaming gear takes a
          beating. That's why we only offer products from reputable brands known
          for their durability and performance. Rest assured, each item in our
          catalog meets our rigorous quality standards.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          <b>Expert Advice:</b> Not sure which gaming gear is right for you? Our
          team of gaming experts is here to help. Reach out to us anytime for
          personalized recommendations and tech support.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          <b>Competitive Pricing:</b> We believe that every gamer should have
          access to the best gear, regardless of their budget. That's why we
          offer competitive prices and regular promotions to make gaming more
          affordable.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          <b>Community Engagement:</b> Join our gaming community! Connect with
          fellow gamers, share tips and tricks, and stay updated on the latest
          gaming news and trends. Follow us on social media and subscribe to our
          newsletter for exclusive offers and gaming insights.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: 30 }}>
          <br /> Our Commitment
        </Typography>
        <Typography>
          Your satisfaction is our top priority. We're committed to providing
          exceptional customer service and ensuring your gaming journey with us
          is seamless. From the moment you browse our selection to the day your
          gear arrives, we're here to assist you every step of the way.
        </Typography>
        <br />
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          Thank you for choosing Bluetech as your trusted source for gaming
          gear. Whether you're a casual player or a professional esports
          athlete, we're here to support your gaming ambitions. Level up your
          game with Bluetech today!
        </Typography>
        <br />
        <Typography variant="body1" sx={{ fontSize: 15 }}>
          Get ready to game like a pro – with Bluetech, you're always one step
          ahead.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
