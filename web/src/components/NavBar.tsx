import { Box, Flex, Link, Button } from "@chakra-ui/react";
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if(fetching) {
  } else if(data?.me) {
    body = (
      <Flex>
        <Box color="white" mr={2}>{ data?.me?.username }</Box>
        <Button 
          variant="link" 
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    )
  } else {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    )
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  )
}