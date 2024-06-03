import { SpecReporter } from "jasmine-spec-reporter";

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  // @ts-ignore
  new SpecReporter({
    spec: {
      displayPending: true,
    },
  })
);
