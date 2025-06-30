import { test, expect } from "@playwright/experimental-ct-react";
import { TasksFilter } from "../../../src/features/tracks/filter-tracks/ui/TasksFilter";
import { FilterWrapper } from "./FilterWrapper";

test("should render filter button correctly", async ({ mount, page }) => {
  const title = "Filter by genre";
  await mount(
    <TasksFilter
      title={title}
      filter=""
      onChange={() => {}}
      testId="filter-button"
    />
  );
  const button = page.getByTestId("filter-button");

  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  await expect(button).toHaveText(title);
});

test("should open dialog when button is clicked", async ({ mount, page }) => {
  const title = "Filter by genre";
  await mount(
    <TasksFilter
      title={title}
      filter=""
      onChange={() => {}}
      testId="filter-button"
    />
  );
  const button = page.getByTestId("filter-button");
  await button.click();
  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();

  const heading = dialog.getByRole("heading", { name: title });
  await expect(heading).toHaveText(title);
});

test("dialog should close when clicking outside", async ({ mount, page }) => {
  const title = "Filter by genre";
  await mount(
    <TasksFilter
      title={title}
      filter=""
      onChange={() => {}}
      testId="filter-button"
    />
  );
  const button = page.getByTestId("filter-button");
  await button.click();
  const dialog = page.getByRole("dialog");
  await page.mouse.click(0, 0);

  await expect(dialog).not.toBeVisible();
});

test("dialog should contain input field when no options are provided", async ({
  mount,
  page,
}) => {
  const title = "Filter by genre";
  await mount(
    <TasksFilter
      title={title}
      filter=""
      onChange={() => {}}
      testId="filter-button"
    />
  );
  const button = page.getByTestId("filter-button");
  await button.click();
  const dialog = page.getByRole("dialog");
  const inputField = dialog.getByRole("textbox");
  await expect(inputField).toBeVisible();
  await expect(inputField).toBeFocused();
  await expect(inputField).toHaveValue("");
});

test("dialog should contain select field when options are provided", async ({
  mount,
  page,
}) => {
  const title = "Filter by genre";
  const options = ["Rock", "Pop", "Jazz"];
  await mount(
    <TasksFilter
      title={title}
      filter=""
      options={options}
      onChange={() => {}}
      testId="filter-button"
    />
  );
  const button = page.getByTestId("filter-button");
  await button.click();
  const dialog = page.getByRole("dialog");
  const selectField = dialog.getByRole("combobox");

  await expect(selectField).toBeVisible();
});

test("should apply filter from input", async ({ mount, page }) => {
  let appliedValue = "";
  const onChange = (value: string) => {
    appliedValue = value;
  };
  const title = "Filter by genre";

  await mount(
    <TasksFilter
      title={title}
      filter=""
      onChange={onChange}
      testId="filter-button"
    />
  );

  const button = page.getByTestId("filter-button");
  await button.click();
  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();

  const input = dialog.getByRole("textbox");
  await input.fill("Rock");
  const applyButton = dialog.getByRole("button", { name: "Apply" });

  await expect(applyButton).toBeEnabled();

  await applyButton.click();
  expect(appliedValue).toBe("Rock");
  await expect(dialog).not.toBeVisible();
});

test("should reset filter input when reset button is clicked", async ({ mount, page }) => {
  let appliedValue = "Jazz";
  const onChange = (value: string) => {
    appliedValue = value;
  };
  const title = "Filter by genre";

  await mount(
    <TasksFilter
      title={title}
      filter={appliedValue}
      onChange={onChange}
      testId="filter-button"
    />
  );

  const button = page.getByTestId("filter-button");
  await button.click();
  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();

  const input = dialog.getByRole("textbox");
  await input.fill("Rock");
  const resetButton = dialog.getByRole("button", { name: "Reset" });
  await resetButton.click();

  expect(appliedValue).toBe("");
});

test("applies filter from select form", async ({ mount, page }) => {
  let appliedValue = "";
  const onChange = (value: string) => {
    appliedValue = value;
  };
  const title = "Filter by genre";
  const options = ["Rock", "Pop", "Jazz"];

  await mount(
    <TasksFilter
      title={title}
      filter=""
      options={options}
      onChange={onChange}
      testId="filter-button"
    />
  );

  const button = page.getByTestId("filter-button");
  await button.click();
  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();

  const selectTrigger = dialog.getByRole("combobox");
  await selectTrigger.click();
  const option = page.getByRole("option", { name: "Rock" });
  await option.click();
  const applyButton = dialog.getByRole("button", { name: "Apply" });

  await expect(applyButton).toBeEnabled();

  await applyButton.click();

  expect(appliedValue).toBe("Rock");
  await expect(dialog).not.toBeVisible();
});

test("should render button icon correctly when filter value changes", async ({
  mount,
  page,
}) => {
  const title = "Filter by genre";
  await mount(<FilterWrapper title={title} />);
  const button = page.getByTestId("filter-button");
  const plusIcon = button.getByTestId("filter-button-plus-icon");

  await expect(plusIcon).toBeVisible();

  const dialog = page.getByRole("dialog");
  const input = dialog.getByRole("textbox");
  const applyButton = dialog.getByRole("button", { name: "Apply" });
  await button.click();
  await input.fill("Rock");
  await applyButton.click();
  const icon = button.getByTestId("filter-button-icon");

  await expect(icon).toBeVisible();
  await expect(plusIcon).not.toBeVisible();
});
