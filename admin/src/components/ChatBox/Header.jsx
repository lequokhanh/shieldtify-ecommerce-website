import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="SalesGPT" src="https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/newseventsimage_1604942070154_mainnews2012_x1.jpg">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          SalesGPT
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};

export default Header;
