module.exports = {
  detailsOfIncidentPayload: () => {
    return {
      Incidents: {
        // required
        // free form text
        // min 1
        // max 250
        // escaped
        IncidentTitle: "",
        // required
        // free form text
        // min 1
        // max 1024
        // escaped
        NatureOfProblem:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum lacus elit, et consequat sem euismod non. Vestibulum sed ultrices dolor, a mollis ex. Curabitur feugiat felis id tellus tempus convallis. Vivamus tincidunt enim eget leo venenatis, mattis porttitor neque suscipit. Curabitur interdum eu erat quis gravida. Proin eros ante, iaculis ut scelerisque ac, porta eu erat. Nunc mauris felis, dapibus sed dictum et, laoreet eget diam. Aliquam eu nunc quis arcu tincidunt dignissim.",
        // free form text
        // min 0
        // max 1024
        // escaped
        ActionTaken: "",
        // free form text
        // min 0
        // max 1024
        // escaped
        DistributionDetails:
          "Cras imperdiet eros in ante dignissim, pellentesque laoreet enim dignissim. Phasellus luctus feugiat sollicitudin. Suspendisse tincidunt massa a tortor euismod mattis.",
        // free form text
        // min 0
        // max 1024
        // escaped
        IllnessDetails: "unknown",
        // free form text
        // min 0
        // max 1024
        // escaped
        LocalAuthorityNotified: "",
        // free form text
        // min 0
        // max 1024
        // escaped
        AdditionalInformation:
          "Nec auctor eros tincidunt. Nam consequat neque sit amet rhoncus luctus. Nunc at tortor posuere, porttitor nisi ac, lacinia eros. Nam accumsan augue ac arcu tristique volutpat gravida at erat. Etiam at nibh sem. Nam nec turpis nisi. Curabitur a orci nec libero elementum commodo.",
      },
    };
  },
};
