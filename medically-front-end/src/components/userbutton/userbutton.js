import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import useStyles from "./userbutton.style";

export default function UserButton({ image, name, email, icon, ...others }) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
}
